import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayEventRequestContext,
} from 'aws-lambda';
import { v4 } from 'uuid';
import { handler } from '../../src/handler/post';

jest.mock('../../src/util/logger.ts');

describe('Test Post Lambda Function', () => {
  test('should return 201 with the body', async () => {
    const body: Record<string, string> = {
      vin: 'string',
      manufacturerCampaignReference: 'string',
      dvsaCampaignReference: 'R/2013/121',
      recallCampaignStartDate: '2022-01-31',
    };
    const requestContext: APIGatewayEventRequestContext = <APIGatewayEventRequestContext> { requestId: v4() };
    const headers: Record<string, string> = { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ij', 'X-Api-Key' : 'theprovidedapiusagekey' };
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      requestContext,
      headers,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(201);
  });
});
