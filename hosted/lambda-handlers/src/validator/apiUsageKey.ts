import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const usageTokenRegex = new RegExp(/^.{10,}$/);

const validUsageKey = (headers:APIGatewayProxyEventHeaders):boolean => {
  return headers['x-api-key'] != null && usageTokenRegex.test(headers['x-api-key']);
};

export default validUsageKey;
