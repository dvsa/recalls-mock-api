import {
  RecallResponseContract, RecallsCreateRequest, RecallsUpdateRequest, RepairStatus,
} from '../util/payloads';

const dvsaCampaignRegex = /^[a-zA-Z]+\/[0-9]{4}\/[0-9]{3}/;
const dateFormatRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
const vinRegex = /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;

const manufacturerCampaignReferenceRegex = /^[a-zA-Z0-9_/\\-]*$/;
const manufacturerCampaignReferenceMaxLength = 50;

export const validateManufacturerCampaignReferenceRegex = (manufacturerCampaignReference: string | null | undefined): boolean => !!manufacturerCampaignReference && manufacturerCampaignReference.length < manufacturerCampaignReferenceMaxLength && manufacturerCampaignReferenceRegex.test(manufacturerCampaignReference);

export const validDvsaCampaignReference = (dvsaCampaignReference:string):boolean => dvsaCampaignRegex.test(dvsaCampaignReference);

export const validDateFormat = (recallCampaignStartDate:string):boolean => dateFormatRegex.test(recallCampaignStartDate);

export const validVinFormat = (vin:string):boolean => vinRegex.test(vin);

export const alreadyRepaired = (vehicle:RecallResponseContract):boolean => vehicle.repairStatus === RepairStatus.FIXED;

export const allRequiredFieldsCreateRecall = (recall: RecallsCreateRequest):boolean => (
  checkProperty(recall.vin)
    && validateManufacturerCampaignReferenceRegex(recall.manufacturerCampaignReference)
    && checkProperty(recall.recallCampaignStartDate)
);

export const allRequiredFieldsUpdateNonfixedRecall = (recall:RecallsUpdateRequest):boolean => (
  checkProperty(recall.rectificationDate)
    && checkProperty(recall.repairStatus)
);

export const allRequiredFieldsUpdateFixedRecall = (recall:RecallsUpdateRequest):boolean => (
  checkProperty(recall.repairStatus)
);

export const rectificationDateIsInvalid = (recallClosedDate:string, recallOpenDate:string):boolean => {
  const openDate = new Date(recallOpenDate);
  const closedDate = new Date(recallClosedDate);
  return closedDate < openDate;
};
const checkProperty = (objectProperty: string): boolean => objectProperty != null && objectProperty.length > 0;
