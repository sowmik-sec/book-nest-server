import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: Date;
  bookAddedBy: Types.ObjectId | IUser;
}

export type BookModel = Model<IBook>;

export type IBookFilters = {
  searchTerm?: string;
  publicationDate?: string;
  genre?: string;
  bookAddedBy?: string;
};
