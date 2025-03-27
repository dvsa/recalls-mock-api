import type { APIGatewayProxyEventHeaders } from 'aws-lambda';

const usageTokenRegex = /^.{10,}$/;

const validUsageKey = (headers:APIGatewayProxyEventHeaders):boolean => {
  const key = headers['x-api-key'] ?? headers['X-Api-Key'];
  return key != null && usageTokenRegex.test(key);
};

export default validUsageKey;
