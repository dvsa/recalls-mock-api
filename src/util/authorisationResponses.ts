export const ErrorMissingGrantType = {
  error: 'invalid_request',
  error_description: 'AADSTS900144: The request body must contain the following parameter: \'grant_type\'.Trace ID: 3ce49108-e01b-4d68-97b6-43d48e3cfc00\r\nCorrelation ID: aeccb1c7-a47a-4046-bc3b-5c9e8bf7e9a3\r\nTimestamp: 2022-12-18 13:58:47Z',
  error_codes: [
    900144,
  ],
  timestamp: '2022-12-18 13:58:47Z',
  trace_id: '3ce49108-e01b-4d68-97b6-43d48e3cfc00',
  correlation_id: 'aeccb1c7-a47a-4046-bc3b-5c9e8bf7e9a3',
  error_uri: 'https://login.microsoftonline.com/error?code=900144',
};

export const ErrorMissingClientID = {
  error: 'invalid_request',
  error_description: 'AADSTS900144: The request body must contain the following parameter: \'client_id\'.Trace ID: 3ce49108-e01b-4d68-97b6-43d48e3cfc00\r\nCorrelation ID: aeccb1c7-a47a-4046-bc3b-5c9e8bf7e9a3\r\nTimestamp: 2022-12-18 13:58:47Z',
  error_codes: [
    900144,
  ],
  timestamp: '2022-12-18 13:58:47Z',
  trace_id: '3ce49108-e01b-4d68-97b6-43d48e3cfc00',
  correlation_id: 'aeccb1c7-a47a-4046-bc3b-5c9e8bf7e9a3',
  error_uri: 'https://login.microsoftonline.com/error?code=900144',
};

export const ErrorMissingClientSecret = {
  error: 'invalid_client',
  error_description: 'AADSTS7000216: \'client_assertion\', \'client_secret\' or \'request\' is required for the \'client_credentials\' grant type.\r\nTrace ID: 82518dea-7b7f-4ed4-a2ac-6b9fe9093c00\r\nCorrelation ID: 9055506b-febf-40f9-ba67-cc81a124256c\r\nTimestamp: 2022-12-21 14:20:05',
  error_codes: [
    7000216,
  ],
  timestamp: '2022-12-18 13:58:47Z',
  trace_id: '3ce49108-e01b-4d68-97b6-43d48e3cfc00',
  correlation_id: '9055506b-febf-40f9-ba67-cc81a124256c',
  error_uri: 'https://login.microsoftonline.com/error?code=7000216',
};

export const ErrorMissingScope = {
  error: 'invalid_request',
  error_description: 'AADSTS90014: The required field \'scope\' is missing from the credential. Ensure that you have all the necessary parameters for the login request.\r\nTrace ID: a97dfbdc-9ee5-4a6a-91e1-5120fc9d6400\r\nCorrelation ID: 7d7e9995-63d2-44b4-bc80-98e81d84ec71\r\nTimestamp: 2022-12-21 14:22:28Z',
  error_codes: [
    90014,
  ],
  timestamp: '2022-12-18 13:58:47Z',
  trace_id: '3ce49108-e01b-4d68-97b6-43d48e3cfc00',
  correlation_id: '7d7e9995-63d2-44b4-bc80-98e81d84ec71',
  error_uri: 'https://login.microsoftonline.com/error?code=90014',
};

export const AuthenticatedMessage = {
  token_type: 'Bearer',
  expires_in: 1199,
  ext_expires_in: 1199,
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
};
