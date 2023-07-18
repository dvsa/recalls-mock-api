import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const tokenRegex = new RegExp(/^Bearer\s.{12,}/g);

const validAuthorisation = (headers:APIGatewayProxyEventHeaders):boolean => {
  return headers.Authorization != null && tokenRegex.test(headers.Authorization) ;
};

export default validAuthorisation;
