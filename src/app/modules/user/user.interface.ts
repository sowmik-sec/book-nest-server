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
export interface IUserMethods {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
  isUserExist(email: string): Promise<boolean>;
}

// Create a new Model type that knows about IUserMethods...
export type UserModel = Model<IUser, object, IUserMethods>;
