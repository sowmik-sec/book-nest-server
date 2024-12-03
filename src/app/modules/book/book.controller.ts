import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { IBook } from './book.interface';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFilterableFields } from './book.constant';
import { paginationFields } from '../../../constants/pagination';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);
  sendResponse<IBook>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
};
