import express, {Express} from 'express';
import {APIGatewayEventRequestContext, APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";

import {
    GetRecallsFunction
} from '@recalls-mock-api/lambda-handlers';

import 'dotenv/config';
import {v4} from "uuid";

const app: Express = express();
app.use(express.json());

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
    if (response.statusCode === 200) {
        res.set('Content-Type', 'application/json');
    }
    console.log(response);
    res.status(response.statusCode);
    res.send(response.body);
})

export default app;
