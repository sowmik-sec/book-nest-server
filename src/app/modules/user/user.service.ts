import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  return await User.create(userData);
};

export const UserService = {
  createUser,
};
