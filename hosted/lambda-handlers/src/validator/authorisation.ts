import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const tokenRegex = new RegExp(/^Bearer\s.{12,}/);

const validAuthorisation = (headers:APIGatewayProxyEventHeaders):boolean => {
  return headers.authorization != null && tokenRegex.test(headers.authorization) ;
};

export default validAuthorisation;
