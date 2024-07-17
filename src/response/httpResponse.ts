import { StatusCodes } from 'http-status-codes';
import { APIGatewayProxyResult } from 'aws-lambda';

const HttpResponse = (statusCode:StatusCodes, message:unknown): APIGatewayProxyResult => {
  const body = JSON.stringify(message);
  return {
    statusCode,
    body,
  };
};

export default HttpResponse;
