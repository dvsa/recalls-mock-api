import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const usageTokenRegex = new RegExp(/^.{10,}$/g);

const validUsageKey = (headers:APIGatewayProxyEventHeaders):boolean => {
  return headers['X-Api-Key'] != null && usageTokenRegex.test(headers['X-Api-Key']);
};

export default validUsageKey;
