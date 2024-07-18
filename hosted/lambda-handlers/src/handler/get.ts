import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import HttpResponse from '../response/httpResponse';
import validAuthorisation from '../validator/authorisation';
import Vehicles from '../data/vehicles';
import { RecallResponseContract, RecallsDataReponseDetail, RecallsGetDataResponse } from '../util/payloads';
import validUsageKey from '../validator/apiUsageKey';
import { createDate } from '../util/date';
import { HttpErrorResponse } from '../response/httpErrorResponse';
import ErrorCodes from '../util/errorCodes';
import ErrorMessages from '../util/errorMessages';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event.headers);

  if (!validAuthorisation(event.headers)) {
    return HttpErrorResponse(StatusCodes.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, ErrorMessages.UNAUTHORIZED);
  }
  if (!validUsageKey(event.headers)) {
    return HttpErrorResponse(StatusCodes.FORBIDDEN, ErrorCodes.FORBIDDEN, ErrorMessages.UNRECOGNIZED_API_KEY);
  }
  if (!event.pathParameters || !event.pathParameters.vin) {
    return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
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
  let vehicleFound = Vehicles.filter((vehicle) => vehicle.vin === vin);
  if (dvsaCampaignReference) {
    vehicleFound = vehicleFound.filter((vehicle) => vehicle.dvsaCampaignReference === dvsaCampaignReference);
  }
  if (manufacturerCampaignReference) {
    vehicleFound = vehicleFound.filter((vehicle) => vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
  }
  if (vehicleFound.length > 0) {
    return HttpResponse(StatusCodes.OK, createRecallsDataResponse(vehicleFound, vin, vehicleFound[0].manufacturerId));
  }
  return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};

const createRecallsDataResponse = (vehicles:RecallResponseContract[], vin:string, manufacturer:string):RecallsGetDataResponse => {
  const recallDataResponse = <RecallsGetDataResponse>{};
  recallDataResponse.vin = vin;
  recallDataResponse.manufacturer = manufacturer;
  recallDataResponse.recalls = createArrayOfRecalls(vehicles);
  recallDataResponse.lastUpdatedDate = createDate();
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
