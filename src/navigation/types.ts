import { AuthRoutes, GeneralRoutes, PrivateRoutes } from '../constants/routes';

export type RootStackParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [GeneralRoutes.ONBOARDING]: undefined;
  [PrivateRoutes.MAIN]: undefined;
};
