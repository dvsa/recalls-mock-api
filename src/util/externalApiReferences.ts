enum ExternalApiErrorMessages {
  InvalidRequestBody = 'Invalid request body',
  VinParameterMissing = 'Required vin parameter is missing',
  DvsaCampaignReferenceParamMissing = 'Required dvsaCampaignReference parameter is missing',
  DvsaAndManufacturerCampaignReferenceMissing = 'Required dvsaCampaignReference and/or manufacturerCampaignReference parameter is missing',
  DvsaCampaignReferenceInvalid = 'Invalid dvsa campaign reference number',
  VehicleRecallAlreadyFixed = 'Vehicle recall has already been marked as fixed',
  InvalidDateFormat = 'Invalid date format',
}

export default ExternalApiErrorMessages;
