import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { RecallDetail, RecallResponseContract, RecallsCreateDataResponse, RecallsCreateRequest } from '../util/payloads';
import HttpResponse from '../response/httpResponse';
import { allRequiredFieldsCreateRecall, validDateFormat } from '../validator/validatorsRecall';
import validAuthorisation from '../validator/authorisation';
import Vehicles from '../data/vehicles';
import ExternalApiErrorMessages from '../util/errorMessages';
import validUsageKey from '../validator/apiUsageKey';
import { createDate } from '../util/date';
import ErrorCodes from '../util/errorCodes';
import { HttpErrorResponse } from '../response/httpErrorResponse';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpErrorResponse(StatusCodes.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
  if (!validUsageKey(event.headers)) {
    return HttpErrorResponse(StatusCodes.FORBIDDEN, ErrorCodes.FORBIDDEN, getReasonPhrase(StatusCodes.FORBIDDEN));
  }
  if (!event.body) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  let recall:RecallsCreateRequest;
  try {
    recall = JSON.parse(event.body) as RecallsCreateRequest;
    if (!allRequiredFieldsCreateRecall(recall)) {
      return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
    }
    if (!validDateFormat(recall.recallCampaignStartDate)) {
      return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
    const duplicateVehicle = Vehicles.find((vehicle) => vehicle.vin === recall.vin);
    if (duplicateVehicle) {
      return HttpErrorResponse(StatusCodes.CONFLICT, ErrorCodes.CONFLICT, createConflictMessage(duplicateVehicle));
    }
    return HttpResponse(StatusCodes.CREATED, createCreatedDataResponse(recall));
  } catch (err) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
};

const createCreatedDataResponse = (recall:RecallsCreateRequest):RecallsCreateDataResponse => {
  const recallDataResponse = <RecallsCreateDataResponse>{};
  const recallDetail: RecallDetail = <RecallDetail>{};
  recallDetail.vin = recall.vin;
  recallDetail.manufacturerCampaignReference = recall.manufacturerCampaignReference;
  recallDetail.dvsaCampaignReference = recall.dvsaCampaignReference;
  recallDetail.recallCampaignStartDate = createDate();
  recallDataResponse.manufacturer = 'mock_api_user';
  recallDataResponse.recall = recallDetail;
  return recallDataResponse;
};

const createConflictMessage = (duplicateVehicle: RecallResponseContract): string => {
  return `Vehicle already registered with VIN: ${duplicateVehicle.vin} and DvsaCampaignReference: ${duplicateVehicle.dvsaCampaignReference}`;
};
