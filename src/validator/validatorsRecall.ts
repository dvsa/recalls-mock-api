import {
  RecallResponseContract, RecallsCreateRequest, RecallsUpdateRequest, RepairStatus,
} from '../util/payloads';

const dvsaCampaignRegex = new RegExp(/^[a-zA-Z]+\/[0-9]{4}\/[0-9]{3}/g);
const dateFormatRegex = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}/g);
const vinRegex = new RegExp(/^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/g);

export const validDvsaCampaignReference = (dvsaCampaignReference:string):boolean => dvsaCampaignRegex.test(dvsaCampaignReference);

export const validDateFormat = (recallCampaignStartDate:string):boolean => dateFormatRegex.test(recallCampaignStartDate);

export const validVinFormat = (vin:string):boolean => vinRegex.test(vin);

export const alreadyRepaired = (vehicle:RecallResponseContract):boolean => vehicle.repairStatus === RepairStatus.FIXED;

export const allRequiredFieldsCreateRecall = (recall:RecallsCreateRequest):boolean => {
  const areAllRequiredFieldsPresent:boolean = (
    checkProperty(recall.vin)
    && checkProperty(recall.manufacturerCampaignReference)
    && checkProperty(recall.dvsaCampaignReference)
    && checkProperty(recall.recallCampaignStartDate)
  );
  return areAllRequiredFieldsPresent;
};

export const allRequiredFieldsUpdateNonfixedRecall = (recall:RecallsUpdateRequest):boolean => {
  const areAllRequiredFieldsPresent:boolean = (
    checkProperty(recall.rectificationDate)
    && checkProperty(recall.repairStatus)
  );
  return areAllRequiredFieldsPresent;
};

export const allRequiredFieldsUpdateFixedRecall = (recall:RecallsUpdateRequest):boolean => {
  const areAllRequiredFieldsPresent:boolean = (
    checkProperty(recall.repairStatus)
  );
  return areAllRequiredFieldsPresent;
};

export const rectificationDateIsInvalid = (recallClosedDate:string, recallOpenDate:string ):boolean => {
  const openDate = new Date(recallOpenDate);
  const closedDate = new Date(recallClosedDate);
  return closedDate < openDate;
};
const checkProperty = (objectProperty: string): boolean => objectProperty != null && objectProperty.length > 0;
