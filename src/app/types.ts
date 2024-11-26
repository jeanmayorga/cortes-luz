export interface GetAccountOptions {
  provider: string;
  criteria: string;
  code: string;
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

export interface Powercut {
  seed: string;
  date: string;
  dateString: string;
  startTime: string;
  endTime: string;
  registeredAt: string;
}

declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      params?: Record<string, string>
    ) => void;
  }
}
