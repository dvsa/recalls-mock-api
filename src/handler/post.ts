import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { RecallsCreateRequest } from '../util/payloads';
import HttpResponse from '../util/httpResponse';
import { validDvsaCampaignReference, allRequiredFieldsCreateRecall, validDateFormat } from '../util/validatorsRecall';
import validAuthorisation from '../util/authorisation';
import Vehicles from '../util/vehicles';
import ExternalApiErrorMessages from '../util/externalApiReferences';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
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
    if (!validDvsaCampaignReference(recall.dvsaCampaignReference)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaCampaignReferenceInvalid);
    }
    if (!validDateFormat(recall.recallCampaignStartDate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
    const duplicateVehicle = Vehicles.find((vehicle) => vehicle.vin === recall.vin);
    if (duplicateVehicle) {
      return HttpResponse(StatusCodes.CONFLICT, duplicateVehicle);
    }
    return HttpResponse(StatusCodes.CREATED, getReasonPhrase(StatusCodes.CREATED));
  } catch (err) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
};
