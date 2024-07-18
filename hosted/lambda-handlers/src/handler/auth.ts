import 'dotenv/config';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import HttpResponse from '../response/httpResponse';
import {
  ErrorMissingGrantType, AuthenticatedMessage, ErrorMissingClientID, ErrorMissingClientSecret, ErrorMissingScope,
} from '../response/authorisationResponses';
import {
  containsClientId, containsClientSecret, containsGrantType, containsScope,
} from '../validator/authentication';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log(event.body);
  if (!event.body) {
    return HttpResponse(StatusCodes.BAD_REQUEST, ErrorMissingGrantType);
  }
  let authenticationRequest: string;
  try {
    authenticationRequest = event.body;
    if (!containsGrantType(authenticationRequest)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ErrorMissingGrantType);
    }
    if (!containsClientId(authenticationRequest)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ErrorMissingClientID);
    }
    if (!containsClientSecret(authenticationRequest)) {
      return HttpResponse(StatusCodes.UNAUTHORIZED, ErrorMissingClientSecret);
    }
    if (!containsScope(authenticationRequest)) {
      return HttpResponse(StatusCodes.BAD_REQUEST, ErrorMissingScope);
    }
  } catch (err) {
    return HttpResponse(StatusCodes.BAD_REQUEST, getReasonPhrase(StatusCodes.BAD_REQUEST));
  }
  return HttpResponse(StatusCodes.OK, AuthenticatedMessage);
};
