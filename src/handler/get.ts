import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../util/authorisation';
import Vehicles from '../util/vehicles';
import { RecallResponseContract, RecallsDataReponseDetail, RecallsDataResponse } from '../util/payloads';

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
  let vehiclesFound: RecallResponseContract[] = [];
  if (dvsaCampaignReference) {
    if (vehicleFound && vehicleFound.dvsaCampaignReference === dvsaCampaignReference) {
      vehiclesFound.push(vehicleFound);
      return HttpResponse(StatusCodes.OK, buildresponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
  } else if (manufacturerCampaignReference) {
    if (vehicleFound && vehicleFound.manufacturerCampaignReference === manufacturerCampaignReference) {
      vehiclesFound.push(vehicleFound);
      return HttpResponse(StatusCodes.OK, buildresponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
  } else {
    if (vehicleFound) {
      vehiclesFound = Vehicles.filter((vehicle) => vehicle.vin === vin);
      return HttpResponse(StatusCodes.OK, buildresponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};

const buildresponse = (vehicles:RecallResponseContract[], vin:string, manufacturer:string):RecallsDataResponse => {
  const recallResponse = <RecallsDataResponse>{};
  recallResponse.vin = vin;
  recallResponse.manufacturer = manufacturer;
  const recallsArray:RecallsDataReponseDetail[] = [];
  vehicles.forEach((vehicle) => {
    const recallResponseDetail = <RecallsDataReponseDetail>{};
    recallResponseDetail.dvsaCampaignReference = vehicle.dvsaCampaignReference;
    recallResponseDetail.manufacturerCampaignReference = vehicle.manufacturerCampaignReference;
    recallResponseDetail.recallCampaignStartDate = vehicle.recallCampaignStartDate;
    recallResponseDetail.repairStatus = vehicle.repairStatus;
    recallsArray.push(recallResponseDetail);
  });
  recallResponse.recalls = recallsArray;
  return recallResponse;
};
