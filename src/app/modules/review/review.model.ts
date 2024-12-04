import { model, Schema } from 'mongoose';
import { IBookReview } from './review.interface';

const bookReviewSchema = new Schema<IBookReview>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Review = model<IBookReview>('Review', bookReviewSchema);
