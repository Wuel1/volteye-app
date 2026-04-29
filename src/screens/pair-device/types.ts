export type PairingStep = 'prepare' | 'wifi' | 'connecting' | 'success' | 'error';

export type PairingFormState = {
  isPasswordVisible: boolean;
  wifiName: string;
  wifiPassword: string;
};

export type PairingErrors = Partial<Record<'wifiName' | 'wifiPassword', string>>;

export type PairingDeviceInfo = {
  name: string;
  note?: string;
  room: string;
};
