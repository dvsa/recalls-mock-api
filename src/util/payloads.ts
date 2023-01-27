export type RecallsCreateRequest = {
  vin: string,
  manufacturerCampaignReference: string,
  dvsaCampaignReference: string,
  recallCampaignStartDate: string,
};

export type RecallsUpdateRequest = {
  rectificationDate: string,
  repairStatus: string,
};

export type RecallsResponse = {
  message: string,
};

export type RecallsDataResponse = {
  vin: string,
  manufacturer: string,
  recalls: Array<RecallsDataReponseDetail>
};

export type RecallsDataReponseDetail = {
  manufacturerCampaignReference: string,
  dvsaCampaignReference: string,
  recallCampaignStartDate: string,
  repairStatus: RepairStatus,
};

export enum RepairStatus {
  NOT_FIXED = 'NOT_FIXED',
  FIXED = 'FIXED',
}

export type RecallResponseContract = {
  vin: string,
  manufacturerCampaignReference: string,
  dvsaCampaignReference: string,
  recallCampaignStartDate: string,
  manufacturerId: string,
  repairStatus: RepairStatus,
};
