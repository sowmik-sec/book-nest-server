import { model, Schema } from 'mongoose';
import { IUserBookStatus } from './userBookStatus.interface';

const userBookStatusSchema = new Schema<IUserBookStatus>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    status: {
      type: String,
      enum: ['wishlist', 'reading', 'finished'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const BookStatus = model<IUserBookStatus>(
  'BookStatus',
  userBookStatusSchema,
);
