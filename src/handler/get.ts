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
      return HttpResponse(StatusCodes.OK, createRecallsDataResponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
  } else if (manufacturerCampaignReference) {
    if (vehicleFound && vehicleFound.manufacturerCampaignReference === manufacturerCampaignReference) {
      vehiclesFound.push(vehicleFound);
      return HttpResponse(StatusCodes.OK, createRecallsDataResponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
  } else {
    if (vehicleFound) {
      vehiclesFound = Vehicles.filter((vehicle) => vehicle.vin === vin);
      return HttpResponse(StatusCodes.OK, createRecallsDataResponse(vehiclesFound, vehicleFound.vin, vehicleFound.manufacturerId));
    }
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};

const createRecallsDataResponse = (vehicles:RecallResponseContract[], vin:string, manufacturer:string):RecallsDataResponse => {
  const recallDataResponse = <RecallsDataResponse>{};
  recallDataResponse.vin = vin;
  recallDataResponse.manufacturer = manufacturer;
  recallDataResponse.recalls = createArrayOfRecalls(vehicles);
  return recallDataResponse;
};

const createArrayOfRecalls = (vehicles:RecallResponseContract[]):RecallsDataReponseDetail[] => {
  const vehicleRecalls:RecallsDataReponseDetail[] = [];
  vehicles.forEach((vehicle) => {
    const recallDataResponseDetail = <RecallsDataReponseDetail>{};
    recallDataResponseDetail.dvsaCampaignReference = vehicle.dvsaCampaignReference;
    recallDataResponseDetail.manufacturerCampaignReference = vehicle.manufacturerCampaignReference;
    recallDataResponseDetail.recallCampaignStartDate = vehicle.recallCampaignStartDate;
    recallDataResponseDetail.repairStatus = vehicle.repairStatus;
    vehicleRecalls.push(recallDataResponseDetail);
  });
  return vehicleRecalls;
};
