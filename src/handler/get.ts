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
  if (!event.pathParameters) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (!event.pathParameters.vin) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  const { vin } = event.pathParameters;
  let manufacturerCampaignReference: string | undefined;
  let dvsaCampaignReference: string | undefined;
  if (event.queryStringParameters) {
    if (event.queryStringParameters.dvsaCampaignReference || event.queryStringParameters.manufacturerCampaignReference) {
      manufacturerCampaignReference = event.queryStringParameters.manufacturerCampaignReference;
      dvsaCampaignReference = event.queryStringParameters.dvsaCampaignReference;
    }
  }
  const vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin);
  if (dvsaCampaignReference) {
    if (vehicleFound && vehicleFound.dvsaCampaignReference === dvsaCampaignReference) {
      return HttpResponse(StatusCodes.OK, vehicleFound);
    }
  } else if (manufacturerCampaignReference) {
    if (vehicleFound && vehicleFound.manufacturerCampaignReference === manufacturerCampaignReference) {
      return HttpResponse(StatusCodes.OK, vehicleFound);
    }
  } else {
    if (vehicleFound) {
      const vehiclesFound: unknown[] = Vehicles.filter((vehicle) => vehicle.vin === vin);
      return HttpResponse(StatusCodes.OK, vehiclesFound);
    }
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};
