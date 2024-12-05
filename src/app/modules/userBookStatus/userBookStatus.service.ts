import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginatoin';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IUserBookStatus,
  IUserBookStatusFilters,
} from './userBookStatus.interface';
import { UserBookStatus } from './userBookStatus.model';

const createBookStatus = async (
  UserBookStatusData: IUserBookStatus,
): Promise<IUserBookStatus> => {
  return await UserBookStatus.create(UserBookStatusData);
};

const getBookStatus = async (
  filters: IUserBookStatusFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUserBookStatus[]>> => {
  const { ...filtersData } = filters;

  const andConditions = [];

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await UserBookStatus.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await UserBookStatus.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateUserBookStatus = async (
  id: string,
  userBookStatusData: Partial<IUserBookStatus>,
): Promise<IUserBookStatus | null> => {
  return await UserBookStatus.findOneAndUpdate(
    { _id: id },
    userBookStatusData,
    {
      new: true,
    },
  );
};

const deleteUserBookStatus = async (
  id: string,
): Promise<IUserBookStatus | null> => {
  return await UserBookStatus.findOneAndDelete({ _id: id });
};

export const UserBookStatusService = {
  createBookStatus,
  getBookStatus,
  updateUserBookStatus,
  deleteUserBookStatus,
};
