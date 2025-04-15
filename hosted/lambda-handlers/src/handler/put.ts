import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/errorMessages';
import HttpResponse from '../response/httpResponse';
import validAuthorisation from '../validator/authorisation';
import { RecallsUpdateRequest, RepairStatus } from '../util/payloads';
import {
  allRequiredFieldsUpdateFixedRecall,
  allRequiredFieldsUpdateNonfixedRecall,
  rectificationDateIsInvalid,
  validDateFormat,
} from '../validator/recall';
import validUsageKey from '../validator/apiUsageKey';
import { findVehicle } from '../util/vehicleSearch';
import { HttpErrorResponse } from '../response/httpErrorResponse';
import ErrorCodes from '../util/errorCodes';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!validAuthorisation(event.headers)) {
    return HttpErrorResponse(StatusCodes.UNAUTHORIZED, ErrorCodes.UNAUTHORIZED, ExternalApiErrorMessages.UNAUTHORIZED);
  }
  if (!validUsageKey(event.headers)) {
    return HttpErrorResponse(StatusCodes.FORBIDDEN, ErrorCodes.FORBIDDEN, ExternalApiErrorMessages.FORBIDDEN);
  }
  if (!event.body) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  if (!event.queryStringParameters) {
    return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }
  if (!event.pathParameters || !event.pathParameters.vin) {
    return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }

  if (!event.queryStringParameters.manufacturerCampaignReference && !event.queryStringParameters.dvsaCampaignReference) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.DvsaAndManufacturerCampaignReferenceMissing);
  }

  const { vin } = event.pathParameters;
  const { manufacturerCampaignReference, dvsaCampaignReference } = event.queryStringParameters;
  const recallUpdate = JSON.parse(event.body) as RecallsUpdateRequest;

  if (!recallUpdate.repairStatus) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }

  if (recallUpdate.repairStatus === RepairStatus.FIXED) {
    if (!validDateFormat(recallUpdate.rectificationDate)) {
      return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
  }

  const vehicleFound = findVehicle(vin, dvsaCampaignReference, manufacturerCampaignReference);

  if (!vehicleFound) {
    return HttpErrorResponse(StatusCodes.NOT_FOUND, ErrorCodes.NO_DATA_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (recallUpdate.repairStatus === RepairStatus.FIXED && rectificationDateIsInvalid(recallUpdate.rectificationDate, vehicleFound.recallCampaignStartDate)) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRectificationDate);
  }

  if (vehicleFound.repairStatus === RepairStatus.NOT_FIXED) {
    if (recallUpdate.repairStatus === RepairStatus.FIXED) {
      if (!allRequiredFieldsUpdateNonfixedRecall(recallUpdate)) {
        return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
      }
      return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
    }
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyNotFixed);
  }
  if (!allRequiredFieldsUpdateFixedRecall(recallUpdate)) {
    return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }
  if (recallUpdate.repairStatus === RepairStatus.NOT_FIXED) {
    return HttpResponse(StatusCodes.NO_CONTENT, getReasonPhrase(StatusCodes.NO_CONTENT));
  }
  return HttpErrorResponse(StatusCodes.BAD_REQUEST, ErrorCodes.BAD_REQUEST, ExternalApiErrorMessages.VehicleRecallAlreadyFixed);
};
