import { StatusCodes } from 'http-status-codes';
import type { APIGatewayProxyResult } from 'aws-lambda';
import ErrorCodes from '../util/errorCodes';

export const HttpErrorResponse = (statusCode:StatusCodes, errorCode: ErrorCodes, errorMessage: string): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify({
    requestId: 'id1234',
    errorCode,
    errorMessage,
  }),
});
