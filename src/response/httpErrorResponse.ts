import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyResult } from 'aws-lambda';
import ErrorCodes from '../util/errorCodes';

export const HttpErrorResponse = (statusCode:StatusCodes, errorCode: ErrorCodes, errorMessage: string): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify({
      'requestId': 'id1234',
      'errorCode': errorCode,
      'errorMessage': errorMessage,
    }),
  };
};
