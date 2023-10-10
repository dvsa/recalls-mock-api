import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/externalApiReferences';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../util/authorisation';
import Vehicles from '../util/vehicles';
import { RecallsUpdateRequest, RepairStatus } from '../util/payloads';
import { allRequiredFieldsUpdateFixedRecall, allRequiredFieldsUpdateNonfixedRecall, validDateFormat } from '../util/validatorsRecall';
import logger from '../util/logger';
import validUsageKey from '../util/apiUsageKey';

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

  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  const recallUpdate = JSON.parse(event.body) as RecallsUpdateRequest;
  if (recallUpdate.repairStatus == RepairStatus.FIXED) {
    if (!validDateFormat(recallUpdate.rectificationDate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
  }

  let vehicleFound;

  if (dvsaCampaignReference) {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.dvsaCampaignReference === dvsaCampaignReference);
    logger.info('dvsaCampaignreference', { vehicleFound });
  } else {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
    logger.info('manufacturerCampaignreference', { vehicleFound });
  }

  if (!vehicleFound) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }

  if (vehicleFound.repairStatus === RepairStatus.NOT_FIXED) {
    if (!allRequiredFieldsUpdateNonfixedRecall(recallUpdate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
    }
    if (recallUpdate.repairStatus === RepairStatus.FIXED) {
      return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
    } else {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyNotFixed);
    }
  } else {
    if (!allRequiredFieldsUpdateFixedRecall(recallUpdate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
    }
    if (recallUpdate.repairStatus === RepairStatus.NOT_FIXED) {
      return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
    } else {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyFixed);
    }
  }
  return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
};


