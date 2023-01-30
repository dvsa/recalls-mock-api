import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../util/authorisation';
import Vehicles from '../util/vehicles';

// eslint-disable-next-line @typescript-eslint/require-await
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpResponse(StatusCodes.UNAUTHORIZED, getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
  if (!event.queryStringParameters) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.pathParameters) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.pathParameters.vin) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.queryStringParameters.manufacturerCampaignReference && !event.queryStringParameters.dvsaCampaignReference) {
    return HttpResponse(StatusCodes.INTERNAL_SERVER_ERROR, getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
  }
  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  if (dvsaCampaignReference) {
    const vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.dvsaCampaignReference === dvsaCampaignReference);
    if (vehicleFound) {
      return HttpResponse(StatusCodes.OK, vehicleFound);
    }
  }
  const vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
  if (vehicleFound) {
    return HttpResponse(StatusCodes.OK, vehicleFound);
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};
