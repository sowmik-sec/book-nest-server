import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginatoin';
import { IGenericResponse } from '../../../interfaces/common';
import { IBookReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (ReviewData: IBookReview): Promise<IBookReview> => {
  return await Review.create(ReviewData);
};

const getAllReviews = async (
  bookId: string,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBookReview[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);
  const query = { book: bookId };
  const result = await Review.find(query)
    .populate('user', 'name email -_id')
    .skip(skip)
    .limit(limit);
  const total = await Review.countDocuments(query);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateReview = async (
  id: string,
  ReviewData: Partial<IBookReview>,
): Promise<IBookReview | null> => {
  return await Review.findOneAndUpdate({ _id: id }, ReviewData, {
    new: true,
  }).populate('user', 'name email -_id');
};

const deleteReview = async (id: string): Promise<IBookReview | null> => {
  return await Review.findOneAndDelete({ _id: id }).populate(
    'user',
    'name email -_id',
  );
};

export const ReviewService = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
