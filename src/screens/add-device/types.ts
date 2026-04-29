export type AddDeviceFormState = {
  name: string;
  note: string;
  room: string;
};

export type AddDeviceErrors = Partial<Record<keyof Pick<AddDeviceFormState, 'name' | 'room'>, string>>;
