import { Roles } from '../../../../shared/enums/Roles.enum';

export type UserProp = {
  id?: number | null;
  name: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  role: Roles;
};
