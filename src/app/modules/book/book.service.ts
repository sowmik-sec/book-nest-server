import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginatoin';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';
import { IGenericResponse } from '../../../interfaces/common';

const createBook = async (bookData: IBook): Promise<IBook> => {
  return await Book.create(bookData);
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
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
  const result = await Book.find(whereCondition)
    .populate('bookAddedBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BookService = {
  createBook,
  getAllBooks,
};
