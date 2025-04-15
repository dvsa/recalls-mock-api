# MOT Recalls Mock API

The Recalls Mock API is an application designed to help development teams locally test solutions which use DVSA's MOT Recalls API.

The purpose of this application is to test the functionality of the API calls, not to emulate the modification of records in the database. Therefore, it should only be used to verify that each call works as expected, subsequent calls will not reflect previous actions.

The app can be run as an express application or as a sam-local application 

## Requirements

- node v20.x
- npm 10+

If you would like to run the application using sam-local, you will also need:
- Docker
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Prerequisites
- Create a `.env` in hosted/lambda-handlers
    ```shell
    npm run util:copy-env
    ```

## Build

```shell
  npm i
```
```shell
  npm run build:dev
```

# Run

### Run using express
Ensure build steps have been completed.

```shell
  npm run start:dev
```

### Run using sam local

Ensure docker is running and build steps have been completed. 
```shell
  npm run start:sam
```

#### The lambdas will be available at `http://localhost:3000/`

##  Testing Recalls Mock API locally
To use the recalls mock api locally, send requests to `http://localhost:3000/`. 
You can use tools such as [Postman](https://www.postman.com/) to do this. A [postman collection](Postman/Recalls Mock API 2.6.0.postman_collection.json) has been included with this repo.

## Sample Calls

### Authentication

The Recalls API requires users to generate a JWT token to add to the Authorization header of each request. 

Make a post request to http://127.0.0.1:3000/oauth2/v2.0/token
 
 form data:
 ```json
  grant_type: client_credentials
  client_id: yourdvsaissuedclient_id
  client_secret: yourdvsaissuedclient_secret
  scope: http//:dvsaissuedscope.default
```
### API Usage Key
An API Usage Key will be provided to you when you register for the MOT Recalls API service, this must be provided in the x-api-key header with every request. For the mock api, each request must contain the header 'x-api-key' or 'X-Api-Key' with a 10+ character string. 


### Create a new recall
 make a POST request to http://127.0.0.1:3000/recalls/
 
 headers:
 ```json
  "Authorization": "Bearer token",
  "x-api-key": "your usage key"
```
 body:
 ```json
 {
  "vin": "ABCD122CBAD11435",
  "manufacturerCampaignReference": "string",
  "dvsaCampaignReference": "R/2013/121",
  "recallCampaignStartDate": "2022-01-31"
}
```
### Update a recall - Set status to fixed
 make a PUT request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 the rectification date must be later than the open recalls campaign start date

 headers:
 ```json
  "Authorization": "Bearer token",
  "x-api-key": "your usage key" 
```
 body:
 ```json
{
  "rectificationDate": "2022-09-05",
  "repairStatus": "FIXED"
}
```

### Update a recall - Set status to not fixed
 make a PUT request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11432?dvsaCampaignReference=R/2022/001
 
 headers:
 ```json
  "Authorization": "Bearer token",
  "x-api-key": "your usage key" 
```
 body:
 ```json
{
  "repairStatus": "NOT_FIXED"
}
```
### Retrieve a recall

 make a GET request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 headers:
 ```json
  "Authorization": "Bearer token",
  "x-api-key": "your usage key" 
```

### Delete a recall

 make a DELETE request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 headers:
 ```json
  "Authorization": "Bearer token",
  "x-api-key": "your usage key" 
```

## Directories

`hosted/lambda-handlers/src/handler/`
Lambda handler methods.

`hosted/lambda-handlers/src/util `
Utility and helper functions, including the Logger.

`hosted/express-dev-server`
Express app. 

## Adding Test Data

You can add more test data to the application by modifying `hosted/lambda-handlers/src/data/vehicles.ts `
This file contains a list of vehicle recalls to be used for testing.
To add another vehicle recalls, append to the array an object with the following format:
```
{
  vin: 'YOUR VIN',
  manufacturerCampaignReference: 'YOUR REF',
  dvsaCampaignReference: 'YOUR REF',
  recallCampaignStartDate: 'YYYY-MM-DD',
  manufacturerId: 'YOUR MANUFACTURER NAME',
  repairStatus: RepairStatus.NOT_FIXED or RepairStatus.FIXED,
},
```
