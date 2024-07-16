import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import {
  RecallDetail,
  RecallResponseContract,
  RecallsCreateDataResponse,
  RecallsCreateRequest,
  RecallsGetDataResponse
} from '../util/payloads';
import HttpResponse from '../util/httpResponse';
import { allRequiredFieldsCreateRecall, validDateFormat } from '../validator/validatorsRecall';
import validAuthorisation from '../validator/authorisation';
import Vehicles from '../data/vehicles';
import ExternalApiErrorMessages from '../util/externalApiReferences';
import validUsageKey from '../validator/apiUsageKey';
import {createDate} from "../util/date";

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
  if (!validUsageKey(event.headers)) {
    return HttpResponse(StatusCodes.FORBIDDEN, getReasonPhrase(StatusCodes.FORBIDDEN));
  }
  if (!event.body) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  let recall:RecallsCreateRequest;
  try {
    recall = JSON.parse(event.body) as RecallsCreateRequest;
    if (!allRequiredFieldsCreateRecall(recall)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
    }
    if (!validDateFormat(recall.recallCampaignStartDate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
    const duplicateVehicle = Vehicles.find((vehicle) => vehicle.vin === recall.vin);
    if (duplicateVehicle) {
      return HttpResponse(StatusCodes.CONFLICT, duplicateVehicle);
    }
    return HttpResponse(StatusCodes.CREATED, createCreatedDataResponse(recall));
  } catch (err) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
};

const createCreatedDataResponse = (recall:RecallsCreateRequest):RecallsCreateDataResponse => {
  const recallDataResponse = <RecallsCreateDataResponse>{};
  const recallDetail: RecallDetail = <RecallDetail>{}
  recallDetail.vin = recall.vin;
  recallDetail.manufacturerCampaignReference = recall.manufacturerCampaignReference,
  recallDetail.dvsaCampaignReference = recall.dvsaCampaignReference;
  recallDetail.recallCampaignStartDate = createDate()
  recallDataResponse.manufacturer = 'mock_api_user';
  recallDataResponse.recall = recallDetail
  return recallDataResponse;
};
