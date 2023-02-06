import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/externalApiReferences';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../util/authorisation';
import Vehicles from '../util/vehicles';
import { RecallsUpdateRequest } from '../util/payloads';
import { allRequiredFieldsUpdateRecall, alreadyRepaired, validDateFormat } from '../util/validatorsRecall';
import logger from '../util/logger';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
  if (!event.body) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  if (!event.queryStringParameters) {
    return HttpResponse(StatusCodes.NOT_FOUND, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }
  if (!event.pathParameters) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.pathParameters.vin) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.queryStringParameters.manufacturerCampaignReference && !event.queryStringParameters.dvsaCampaignReference) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }
  let recallUpdate: RecallsUpdateRequest;
  try {
    recallUpdate = JSON.parse(event.body) as RecallsUpdateRequest;
    if (!allRequiredFieldsUpdateRecall(recallUpdate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
    }
  } catch (err) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  let vehicleFound;
  if (dvsaCampaignReference) {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.dvsaCampaignReference === dvsaCampaignReference);
    logger.info('dvsaCampaignreference', { vehicleFound });
  } else {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
    logger.info('manufacturerCampaignreference', { vehicleFound });
  }
  if (vehicleFound) {
    if (alreadyRepaired(vehicleFound)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyFixed);
    }
    if (!validDateFormat(recallUpdate.rectificationDate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
    return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};
