/* eslint-disable @typescript-eslint/no-misused-promises */
// Above rule disabled as express version 4 does not officially support async/await
import express, { Express } from 'express';
import { APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import {
  GetRecallsFunction,
  CreateRecallsFunction,
  UpdateRecallsFunction,
  DeleteRecallsFunction,
  AuthFunction,
} from '@recalls-mock-api/lambda-handlers';

import 'dotenv/config';
import { v4 } from 'uuid';

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/recalls/vin/:vin', async (req, res) => {
  const { dvsaCampaignReference, manufacturerCampaignReference } = req.query;
  // console.log(req.headers);
  const event: APIGatewayProxyEvent = {
    requestContext: {
      requestId: v4(),
    } as APIGatewayEventRequestContext,
    headers: req.headers,
    pathParameters: {
      vin: req.params.vin,
    },
    queryStringParameters: {
      dvsaCampaignReference,
      manufacturerCampaignReference,
    },
  } as unknown as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await GetRecallsFunction.handler(event);
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.status(response.statusCode);
  res.send(response.body);
});

app.post('/recalls', async (req, res) => {
  const event: APIGatewayProxyEvent = {
    requestContext: {
      requestId: v4(),
    } as APIGatewayEventRequestContext,
    headers: req.headers,
    body: JSON.stringify(req.body),
  } as unknown as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await CreateRecallsFunction.handler(event);
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.status(response.statusCode);
  res.send(response.body);
});

app.put('/recalls/vin/:vin', async (req, res) => {
  const { dvsaCampaignReference, manufacturerCampaignReference } = req.query;
  // console.log(req.headers);
  const event: APIGatewayProxyEvent = {
    requestContext: {
      requestId: v4(),
    } as APIGatewayEventRequestContext,
    headers: req.headers,
    pathParameters: {
      vin: req.params.vin,
    },
    queryStringParameters: {
      dvsaCampaignReference,
      manufacturerCampaignReference,
    },
    body: JSON.stringify(req.body),
  } as unknown as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await UpdateRecallsFunction.handler(event);
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.status(response.statusCode);
  res.send(response.body);
});

app.delete('/recalls/vin/:vin', async (req, res) => {
  const { dvsaCampaignReference, manufacturerCampaignReference } = req.query;
  // console.log(req.headers);
  const event: APIGatewayProxyEvent = {
    requestContext: {
      requestId: v4(),
    } as APIGatewayEventRequestContext,
    headers: req.headers,
    pathParameters: {
      vin: req.params.vin,
    },
    queryStringParameters: {
      dvsaCampaignReference,
      manufacturerCampaignReference,
    },
  } as unknown as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await DeleteRecallsFunction.handler(event);
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.status(response.statusCode);
  res.send(response.body);
});

app.post('/oauth2/v2.0/token', async (req, res) => {
  const event: APIGatewayProxyEvent = {
    requestContext: {
      requestId: v4(),
    } as APIGatewayEventRequestContext,
    headers: req.headers,
    body: JSON.stringify(req.body),
  } as unknown as APIGatewayProxyEvent;
  const response: APIGatewayProxyResult = await AuthFunction.handler(event);
  res.set('Content-Type', 'application/json');
  console.log(response);
  res.status(response.statusCode);
  res.send(response.body);
});

export default app;
