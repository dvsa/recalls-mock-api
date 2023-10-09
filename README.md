# Recalls API tester

A SAM Local application to help development teams test output from their solution locally for the safety recalls API

The purpose of this application is to test the functionality of the API calls, not to emulate the modification of records in the database. Therefore, it should only be used to verify that each call works as expected, follow up calls will not reflect previous actions.

## Requirements

- node v16.17.1
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- npm 8+

### Prerequisites
- Create a `.env`
    ```shell
    cp .env.example .env
    ```

## Build

- `npm i`
- `npm run build:dev`

### Run using sam local
Ensure build steps have been completed.

1. `npm run start:dev`
1. The lambdas should be available at `http://localhost:3000/`

###  To run recalls API tester locally
To run the recalls mock api locally, you will need to use Postman to send requests at `http://localhost:3000/`. A [postman collection](Postman/Recalls.postman_collection.json) has been included with this repo.

## Sample Calls

### API Usage Key
An API Usage Key will be provided to you when you register for the service, this must be provided in the x-api-key header with every request.

### Authentication
 make a post request to http://127.0.0.1:3000/oauth2/v2.0/token
 
 form data:
 ```json
  grant_type:client_credentials
  client_id:yourdvsaissuedclient_id
  client_secret:yourdvsaissuedclient_secret
  scope:http//:dvsaissuedscope.default
```

### Create a new recall
 make a post request to http://127.0.0.1:3000/recalls/
 
 header:
 ```json
  "Authorization": "insert bearer token",
  "x-api-key": "insert usage key"
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
 make a put request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
  "x-api-key": "insert usage key"
```
 body:
 ```json
{
  "rectificationDate": "2022-09-05",
  "repairStatus": "FIXED"
}
```

### Update a recall - Set status to not fixed
 make a put request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11432?dvsaCampaignReference=R/2022/001
 
 header:
 ```json
  "Authorization": "insert bearer token",
  "x-api-key": "insert usage key"
```
 body:
 ```json
{
  "repairStatus": "NOT_FIXED"
}
```
### Retrieve a recall

 make a get request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
  "x-api-key": "insert usage key"
```

### Delete a recall

 make a delete request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
  "x-api-key": "insert usage key"
```

## Directories

`src/handler/`
Lambda handler methods here.

`src/resources/util `
Logger utility / helper functions.
