# Recalls API tester

A SAM Local application to help development teams test output from their solution locally for the safety recalls API

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
### Update a recall
 make a put request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
```
 body:
 ```json
{
  "rectificationDate": "2022-09-05",
  "repairStatus": "FIXED"
}
```
### Retrieve a recall

 make a get request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
```

### Delete a recall

 make a delete request to http://127.0.0.1:3000/recalls/vin/ABCD122CBAD11433?dvsaCampaignReference=R/2022/002
 
 header:
 ```json
  "Authorization": "insert bearer token",
```

## Directories

`src/handler/`
Lambda handler methods here.

`src/resources/util `
Logger utility / helper functions.
