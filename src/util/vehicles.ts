import { RecallResponseContract, RepairStatus } from './payloads';

const Vehicles:RecallResponseContract[] = [
  {
    vin: 'ABCD122CBAD11432',
    manufacturerCampaignReference: '12AB12',
    dvsaCampaignReference: 'R/2022/001',
    recallCampaignStartDate: '2004/12/04',
    manufacturerId: 'manufacturer',
    repairStatus: RepairStatus.FIXED,
  },
  {
    vin: 'ABCD122CBAD11433',
    manufacturerCampaignReference: '12AB13',
    dvsaCampaignReference: 'R/2022/002',
    recallCampaignStartDate: '2005/01/02',
    manufacturerId: 'manufacturer',
    repairStatus: RepairStatus.NOT_FIXED,
  },
  {
    vin: 'ABCD122CBAD11433',
    manufacturerCampaignReference: '12AB14',
    dvsaCampaignReference: 'R/2022/004',
    recallCampaignStartDate: '2006/01/02',
    manufacturerId: 'manufacturer',
    repairStatus: RepairStatus.NOT_FIXED,
  },
];

export default Vehicles;
