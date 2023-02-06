import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const tokenRegex = new RegExp(/^Bearer\s.{12,}/g);

const validAuthorisation = (headers:APIGatewayProxyEventHeaders):boolean => {
  if (headers.Authorization) {
    if (tokenRegex.test(headers.Authorization)) {
      return true;
    }
    return false;
  }
  return false;
};

export default validAuthorisation;
