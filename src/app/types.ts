export interface Powercut {
  seed: string;
  date: string;
  dateString: string;
  startTime: string;
  endTime: string;
}

export interface Account {
  seed: string;
  account: string;
  contractAccount: string;
  address: string;
  locations: string;
  registeredAt: string;
  powercuts: Powercut[];
}
