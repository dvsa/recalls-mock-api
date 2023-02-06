import { StatusCodes } from 'http-status-codes';

const HttpResponse = (statusCode:StatusCodes, message:unknown) => ({
  statusCode,
  body: JSON.stringify({
    message,
  }),
});

export default HttpResponse;
