import { Model } from 'mongoose';

export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
}

// Put all user instance methods in this interface:
export type UserModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'name' | 'password'>>;
} & Model<IUser>;

// Create a new Model type that knows about IUserMethods...
// export type UserModel = Model<IUser, object, IUserMethods>;
