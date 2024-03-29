import 'dotenv/config';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ExternalApiErrorMessages from '../util/externalApiReferences';
import HttpResponse from '../util/httpResponse';
import validAuthorisation from '../util/authorisation';
import { RecallsUpdateRequest, RepairStatus } from '../util/payloads';
import { allRequiredFieldsUpdateFixedRecall, allRequiredFieldsUpdateNonfixedRecall, rectificationDateIsInvalid, validDateFormat } from '../util/validatorsRecall';
import validUsageKey from '../util/apiUsageKey';
import { findVehicle } from '../util/vehicleSearch';

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

  if (!recallUpdate.repairStatus) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
  }

  if (recallUpdate.repairStatus == RepairStatus.FIXED) {
    if (!validDateFormat(recallUpdate.rectificationDate)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidDateFormat);
    }
  }

  const vehicleFound = findVehicle(vin, dvsaCampaignReference, manufacturerCampaignReference);

  if (!vehicleFound) {
    return HttpResponse(StatusCodes.NOT_FOUND, getReasonPhrase(StatusCodes.NOT_FOUND));
  }
  if (recallUpdate.repairStatus == RepairStatus.FIXED && rectificationDateIsInvalid(recallUpdate.rectificationDate, vehicleFound.recallCampaignStartDate)) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRectificationDate);
  }

  if (vehicleFound.repairStatus === RepairStatus.NOT_FIXED) {
    if (recallUpdate.repairStatus === RepairStatus.FIXED) {
      if (!allRequiredFieldsUpdateNonfixedRecall(recallUpdate)) {
        return HttpResponse(StatusCodes.BAD_REQUEST, ExternalApiErrorMessages.InvalidRequestBody);
      }
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
};


