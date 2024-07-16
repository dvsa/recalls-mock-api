import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/externalApiReferences';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../validator/authorisation';
import { alreadyRepaired } from '../validator/validatorsRecall';
import validUsageKey from '../validator/apiUsageKey';
import { findVehicle } from '../util/vehicleSearch';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
  if (!validUsageKey(event.headers)) {
    return HttpResponse(StatusCodes.FORBIDDEN, getReasonPhrase(StatusCodes.FORBIDDEN));
  }
  if (!event.queryStringParameters) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
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
  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  const vehicleFound = findVehicle(vin, dvsaCampaignReference, manufacturerCampaignReference);
  if (vehicleFound) {
    if (alreadyRepaired(vehicleFound)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyFixed);
    }
    return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};
