import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyEventPathParameters,
  APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';
import { handler } from '../../src/handler/delete';
import Vehicles from '../../src/data/vehicles';
import ErrorMessages from '../../src/util/errorMessages';
import validUsageKey from '../../src/validator/apiUsageKey';
import validAuthorisation from '../../src/validator/authorisation';


jest.mock('../../src/util/logger.ts');

jest.mock('../../src/validator/authorisation.ts');
jest.mock('../../src/validator/apiUsageKey.ts');
const mockAPIKeyValidator = jest.mocked(validUsageKey);
const mockAuthValidator = jest.mocked(validAuthorisation);

describe('Test GET Lambda Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthValidator.mockReturnValue(true);
    mockAPIKeyValidator.mockReturnValue(true);
  });

  test('should return 204', async () => {
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {

      pathParameters: { vin: Vehicles[1].vin } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: Vehicles[1].dvsaCampaignReference } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(204);
  });

  test('should return 400 if vehicle already fixed', async () => {
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      pathParameters: { vin: Vehicles[0].vin } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: Vehicles[0].dvsaCampaignReference } as APIGatewayProxyEventQueryStringParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(400);
    expect(res.body).toContain(ErrorMessages.VehicleRecallAlreadyFixed);
  });

  test('should return 404 when recall not found', async () => {
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {

      pathParameters: { vin: 'UNKNOWN_VIN' } as APIGatewayProxyEventPathParameters,
      queryStringParameters: { dvsaCampaignReference: 'REF' } as APIGatewayProxyEventQueryStringParameters,

    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(404);
  });
});
