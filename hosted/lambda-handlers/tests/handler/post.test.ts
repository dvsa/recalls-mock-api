import type {
  APIGatewayProxyEvent, APIGatewayProxyResult,
} from 'aws-lambda';
import { handler } from '../../src/handler/post';
import validUsageKey from '../../src/validator/apiUsageKey';
import validAuthorisation from '../../src/validator/authorisation';
import Vehicles from '../../src/data/vehicles';
import { allRequiredFieldsCreateRecall, validDateFormat } from '../../src/validator/validatorsRecall';

jest.mock('../../src/validator/authorisation.ts');
jest.mock('../../src/validator/apiUsageKey.ts');
jest.mock('../../src/validator/validatorsRecall');
const mockAPIKeyValidator = jest.mocked(validUsageKey);
const mockAuthValidator = jest.mocked(validAuthorisation);
const mockDateValidator = jest.mocked(validDateFormat);
const mockAllRequiredFieldsCreateRecall = jest.mocked(allRequiredFieldsCreateRecall);


jest.mock('../../src/validator/validatorsRecall', () => {
  return {
    validDateFormat: jest.fn().mockImplementation(() => mockDateValidator ),
    allRequiredFieldsCreateRecall: jest.fn().mockImplementation(() => mockAllRequiredFieldsCreateRecall ),
  };
});

jest.mock('../../src/util/logger.ts');

describe('Test Post Lambda Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthValidator.mockReturnValue(true);
    mockAPIKeyValidator.mockReturnValue(true);
    mockDateValidator .mockReturnValue(true);
    mockAllRequiredFieldsCreateRecall.mockReturnValue(true);
  });

  test('should return 201 with the body', async () => {
    const body: Record<string, string> = {
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

  test('should return 409 if recall already registered', async () => {
    const body: Record<string, string> = {
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
