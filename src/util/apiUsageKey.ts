import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const usageTokenRegex = new RegExp(/^.{10,}$/g);

const validUsageKey = (headers:APIGatewayProxyEventHeaders):boolean => {
  if (headers['X-Api-Key']) {
    if (usageTokenRegex.test(headers['X-Api-Key'])) {
      return true;
    }
    return false;
  }
  return false;
};

export default validUsageKey;
