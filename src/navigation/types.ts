import { AuthRoutes, GeneralRoutes, PrivateRoutes } from '../constants/routes';

export type RootStackParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.REGISTER]: undefined;
  [GeneralRoutes.ONBOARDING]: undefined;
  [PrivateRoutes.MAIN]: undefined;
};
