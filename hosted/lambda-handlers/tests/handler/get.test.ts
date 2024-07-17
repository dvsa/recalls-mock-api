import type {
  APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyEventPathParameters,
} from 'aws-lambda';
import { handler } from '../../src/handler/get';
import Vehicles from '../../src/data/vehicles';
import validUsageKey from '../../src/validator/apiUsageKey';
import validAuthorisation from '../../src/validator/authorisation';

jest.mock('../../src/validator/authorisation.ts');
jest.mock('../../src/validator/apiUsageKey.ts');
const mockAPIKeyValidator = jest.mocked(validUsageKey);
const mockAuthValidator = jest.mocked(validAuthorisation);

jest.mock('../../src/util/logger.ts');

describe('Test GET Lambda Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockAuthValidator.mockReturnValue(true);
    mockAPIKeyValidator.mockReturnValue(true);
  });

  test('should return 200 with the recall details', async () => {
    const recalls: Record<string, unknown> = {
      recalls: [{
        dvsaCampaignReference: Vehicles[0].dvsaCampaignReference,
        manufacturerCampaignReference: Vehicles[0].manufacturerCampaignReference,
        recallCampaignStartDate: Vehicles[0].recallCampaignStartDate,
        repairStatus: Vehicles[0].repairStatus,
      }],
    };
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      pathParameters: { vin: Vehicles[0].vin } as APIGatewayProxyEventPathParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual(expect.objectContaining(recalls));
  });

  test('should return 404 when recall not found', async () => {
    const eventMock: APIGatewayProxyEvent = <APIGatewayProxyEvent> {
      pathParameters: { vin: 'UNKNOWN_VIN' } as APIGatewayProxyEventPathParameters,
    };

    const res: APIGatewayProxyResult = await handler(eventMock);

    expect(res.statusCode).toBe(404);
  });
});
