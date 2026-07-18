

export interface SuperadminSystemPowerZone {
  name: string;
  current: number;
  capacity: number;
  occupancy: number;
}
export interface SuperadminSystemPowerAlert {
  date: string;
  shift: string;
  zone: string;
  threshold: string;
  action: string;
}
