import { Schema } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IBook } from '../book/book.interface';

export interface IUserBookStatus {
  user: Schema.Types.ObjectId | IUser;
  book: Schema.Types.ObjectId | IBook;
  status: 'wishlist' | 'reading' | 'finished';
}
