import Vehicles from './vehicles';

export const findVehicle = (vin: string, dvsaCampaignReference?:string, manufacturerCampaignReference?:string) => {
  let vehicleFound;

  if (dvsaCampaignReference && manufacturerCampaignReference) {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.dvsaCampaignReference && vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
  } else if (dvsaCampaignReference) {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.dvsaCampaignReference === dvsaCampaignReference);
  }  else {
    vehicleFound = Vehicles.find((vehicle) => vehicle.vin === vin && vehicle.manufacturerCampaignReference === manufacturerCampaignReference);
  }

  return vehicleFound;
};
