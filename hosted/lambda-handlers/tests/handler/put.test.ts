import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';
import { handler } from '../../src/handler/put';
import Vehicles from '../../src/data/vehicles';
import ErrorMessages from '../../src/util/errorMessages';
import validUsageKey from '../../src/validator/apiUsageKey';
import validAuthorisation from '../../src/validator/authorisation';
import {
  allRequiredFieldsUpdateNonfixedRecall,
  rectificationDateIsInvalid,
  validDateFormat,
} from '../../src/validator/validatorsRecall';


jest.mock('../../src/util/logger.ts');

jest.mock('../../src/validator/authorisation.ts');
jest.mock('../../src/validator/apiUsageKey.ts');
jest.mock('../../src/validator/validatorsRecall');
const mockAPIKeyValidator = jest.mocked(validUsageKey);
const mockAuthValidator = jest.mocked(validAuthorisation);
const mockDateValidator = jest.mocked(validDateFormat);
const mockRequiredFields = jest.mocked(allRequiredFieldsUpdateNonfixedRecall);
const mockRectificationDateInvalid = jest.mocked(rectificationDateIsInvalid);

jest.mock('../../src/validator/validatorsRecall', () => {
  return {
    validDateFormat: jest.fn().mockImplementation(() => mockDateValidator ),
    allRequiredFieldsUpdateNonfixedRecall: jest.fn().mockImplementation(() => mockRequiredFields ),
    allRequiredFieldsUpdateFixedRecall: jest.fn().mockImplementation(() => mockRequiredFields ),
    rectificationDateIsInvalid: jest.fn().mockImplementation( () => mockRectificationDateInvalid ),
  };
});

describe('Test PUT Lambda Function', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthValidator.mockReturnValue(true);
    mockAPIKeyValidator.mockReturnValue(true);
    mockDateValidator .mockReturnValue(true);
    mockRequiredFields.mockReturnValue(true);
    mockRectificationDateInvalid.mockReturnValue(false);
  });

  test('should return 204 when updating recall to FIXED', async () => {
    const body: Record<string, string> = {
      rectificationDate: Vehicles[1].recallCampaignStartDate,
      repairStatus: 'FIXED',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      pathParameters: { vin: Vehicles[1].vin } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: Vehicles[1].dvsaCampaignReference } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(204);
  });

  test('should return 204 when updating recall to NOT_FIXED', async () => {
    const body: Record<string, string> = {
      rectificationDate: '2024-07-17',
      repairStatus: 'NOT_FIXED',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      pathParameters: { vin: Vehicles[0].vin } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: Vehicles[0].dvsaCampaignReference } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(204);
  });

  test('should return 400 if vehicle already fixed', async () => {
    const body: Record<string, string> = {
      rectificationDate: '2024-07-17',
      repairStatus: 'FIXED',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      pathParameters: { vin: Vehicles[0].vin } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: Vehicles[0].dvsaCampaignReference } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toContain(ErrorMessages.VehicleRecallAlreadyFixed);
  });

  test('should return 404 when recall not found', async () => {
    const body: Record<string, string> = {
      rectificationDate: '2024-07-17',
      repairStatus: 'FIXED',
    };

    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      body: JSON.stringify(body),
      pathParameters: { vin: 'UNKNOWN_VIN' } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: 'REF' } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(404);
  });
});
