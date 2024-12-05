import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginatoin';
import { IGenericResponse } from '../../../interfaces/common';
import { IBookReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (ReviewData: IBookReview): Promise<IBookReview> => {
  return await Review.create(ReviewData);
};

const getAllReviews = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBookReview[]>> => {
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const result = await Review.find().skip(skip).limit(limit);
  const total = await Review.countDocuments();
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
  });
};

const deleteReview = async (id: string): Promise<IBookReview | null> => {
  return await Review.findOneAndDelete({ _id: id });
};

export const ReviewService = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
};
