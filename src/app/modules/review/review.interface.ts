import { Model, Types } from 'mongoose';
import { IBook } from '../book/book.interface';
import { IUser } from '../user/user.interface';

export interface IBookReview {
  book: Types.ObjectId | IBook;
  user: Types.ObjectId | IUser;
  comment: string;
}

export type BookReviewModel = Model<IBookReview>;
