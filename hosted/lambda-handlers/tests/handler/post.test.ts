import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from 'aws-lambda';
import { handler } from '../../src/handler/post';
import validUsageKey from '../../src/validator/apiUsageKey';
import validAuthorisation from '../../src/validator/authorisation';
import Vehicles from '../../src/data/vehicles';
import { RecallsCreateRequest } from '../../src/util/payloads';

jest.mock('../../src/validator/authorisation.ts');
jest.mock('../../src/validator/apiUsageKey.ts');

const mockAPIKeyValidator = jest.mocked(validUsageKey);
const mockAuthValidator = jest.mocked(validAuthorisation);

jest.mock('../../src/util/logger.ts');

describe('Test Post Lambda Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthValidator.mockReturnValue(true);
    mockAPIKeyValidator.mockReturnValue(true);
  });

  test('should return 201 with the body', async () => {
    const body: RecallsCreateRequest = {
      vin: 'string',
      manufacturerCampaignReference: 'string',
      dvsaCampaignReference: 'R/2013/121',
      recallCampaignStartDate: '2022-01-31',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(201);
  });

  test('should return 201 with the body when dvsaCampaignReference absent', async () => {
    const body: RecallsCreateRequest = {
      vin: 'string',
      manufacturerCampaignReference: 'string',
      dvsaCampaignReference: undefined,
      recallCampaignStartDate: '2022-01-31',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(201);
  });

  test.each<keyof RecallsCreateRequest>([
    'vin',
    'manufacturerCampaignReference',
    'recallCampaignStartDate',
  ])('should return 400 if required field missing', async (field) => {
    const body: RecallsCreateRequest = {
      vin: 'string',
      manufacturerCampaignReference: 'string',
      dvsaCampaignReference: 'R/2013/121',
      recallCampaignStartDate: '2022-01-31',
    };

    // eslint-disable-next-line security/detect-object-injection
    delete body[field];

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(400);
  });

  test('should return 400 if campaign reference too long', async () => {
    const body: RecallsCreateRequest = {
      vin: Vehicles[0].vin,
      manufacturerCampaignReference: '50CharactersLongManufacturerCampaignReferenceThatExceedsTheLimit',
      dvsaCampaignReference: Vehicles[0].dvsaCampaignReference,
      recallCampaignStartDate: '2025-07-23',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(400);
  });

  test('should return 409 if recall already registered', async () => {
    const body: RecallsCreateRequest = {
      vin: Vehicles[0].vin,
      manufacturerCampaignReference: Vehicles[0].manufacturerCampaignReference,
      dvsaCampaignReference: Vehicles[0].dvsaCampaignReference,
      recallCampaignStartDate: '2022-01-31',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(409);
  });
});
