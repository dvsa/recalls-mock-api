enum ExternalApiErrorMessages {
  InvalidRequestBody = 'Invalid request body',
  VinParameterMissing = 'VIN is required',
  DvsaCampaignReferenceParamMissing = 'DVSA campaign reference is required',
  ManufacturerCampaignReferenceParamMissing = 'Manufacturer campaign reference is required',
  DvsaAndManufacturerCampaignReferenceMissing = 'Required dvsaCampaignReference and/or manufacturerCampaignReference parameter is missing',
  DvsaCampaignReferenceInvalid = 'Invalid dvsa campaign reference number',
  VehicleRecallAlreadyFixed = 'Vehicle recall has already been marked as fixed',
  VehicleRecallAlreadyNotFixed = 'Vehicle recall has already been marked as not fixed',
  InvalidDateFormat = 'Date must be in the format YYYY-MM-DD',
  InvalidRectificationDate = 'Recall rectification date cannot be before recall campaign start date',
  BAD_REQUEST = 'Something is wrong with the request',
  UNAUTHORIZED = 'Your authorisation failed',
  UNRECOGNIZED_API_KEY = 'Your API key is invalid',
  FORBIDDEN = 'You do not have permission to access this',
}

export default ExternalApiErrorMessages;
