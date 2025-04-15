import type { APIGatewayProxyEventHeaders } from 'aws-lambda';

const tokenRegex = /^Bearer\s.{12,}/;

const validAuthorisation = (headers:APIGatewayProxyEventHeaders):boolean => {
  const token = headers.authorization ?? headers.Authorization;
  return token != null && tokenRegex.test(token);
};

export default validAuthorisation;
