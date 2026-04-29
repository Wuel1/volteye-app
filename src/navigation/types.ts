import { AuthRoutes, GeneralRoutes, PrivateRoutes } from '../constants/routes';

export type RootStackParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.REGISTER]: undefined;
  [GeneralRoutes.ONBOARDING]: undefined;
  [PrivateRoutes.ADD_DEVICE]: undefined;
  [PrivateRoutes.DEVICE_DETAIL]: { deviceId: string; deviceName?: string; deviceRoom?: string };
  [PrivateRoutes.DEVICES]: undefined;
  [PrivateRoutes.MAIN]: undefined;
};
