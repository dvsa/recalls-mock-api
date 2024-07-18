export const containsGrantType = (authenticationRequest:string):boolean => authenticationRequest.includes('grant_type');

export const containsClientId = (authenticationRequest:string):boolean => authenticationRequest.includes('client_id');

export const containsClientSecret = (authenticationRequest:string):boolean => authenticationRequest.includes('client_secret');

export const containsScope = (authenticationRequest:string):boolean => authenticationRequest.includes('scope');

import { APIGatewayProxyEventHeaders } from 'aws-lambda';

const usageTokenRegex = new RegExp(/^.{10,}$/);

const validUsageKey = (headers:APIGatewayProxyEventHeaders):boolean => {
  return headers['x-api-key'] != null && usageTokenRegex.test(headers['x-api-key']);
};

export default validUsageKey;
