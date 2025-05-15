import { Role } from 'src/auth/enums/role.enum';

export type RequestUser = {
  id: number;
  role: Role;
};
