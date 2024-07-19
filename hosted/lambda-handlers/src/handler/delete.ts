import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/errorMessages';
import HttpResponse from '../response/httpResponse';
import validAuthorisation from '../validator/authorisation';
import { alreadyRepaired } from '../validator/recall';
import validUsageKey from '../validator/apiUsageKey';
import { findVehicle } from '../util/vehicleSearch';
import { HttpErrorResponse } from '../response/httpErrorResponse';
import ErrorCodes from '../util/errorCodes';
import ErrorMessages from '../util/errorMessages';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpErrorResponse(StatusCodes.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED);
  }
  if (!validUsageKey(event.headers)) {
    return HttpErrorResponse(StatusCodes.FORBIDDEN, ErrorCodes.FORBIDDEN, ErrorMessages.UNRECOGNIZED_API_KEY);
  }
  if (!event.queryStringParameters) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }
  if (!event.pathParameters || !event.pathParameters.vin) {
    return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }

  if (!event.queryStringParameters.manufacturerCampaignReference && !event.queryStringParameters.dvsaCampaignReference) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }
  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  const vehicleFound = findVehicle(vin, dvsaCampaignReference, manufacturerCampaignReference);
  if (vehicleFound) {
    if (alreadyRepaired(vehicleFound)) {
      return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyFixed);
    }
    return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
  }
  return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};
