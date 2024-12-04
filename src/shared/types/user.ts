import { TypeUser } from '../enum/index.js';

export type UserData = {
  name: string;
  email: string;
  avatarUrl: string;
  typeUser: TypeUser;
};
