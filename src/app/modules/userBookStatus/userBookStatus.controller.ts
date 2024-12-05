import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IUserBookStatus } from './userBookStatus.interface';
import { bookStatusFilterableFields } from './userBookStatus.constant';
import { UserBookStatusService } from './userBookStatus.service';

const createBookStatus = catchAsync(async (req: Request, res: Response) => {
  const { ...bookStatusData } = req.body;
  const result = await UserBookStatusService.createBookStatus(bookStatusData);
  sendResponse<IUserBookStatus>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book Status created successfully',
    data: result,
  });
});
const getBookStatus = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookStatusFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await UserBookStatusService.getBookStatus(
    filters,
    paginationOptions,
  );
  sendResponse<IUserBookStatus[]>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book status retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBookStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...bookStatusData } = req.body;
  const result = await UserBookStatusService.updateUserBookStatus(
    id,
    bookStatusData,
  );
  sendResponse<IUserBookStatus>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book status updated successfully',
    data: result,
  });
});

const deleteBookStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserBookStatusService.deleteUserBookStatus(id);
  sendResponse<IUserBookStatus>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Book status deleted successfully',
    data: result,
  });
});

export const UserBookStatusController = {
  createBookStatus,
  getBookStatus,
  updateBookStatus,
  deleteBookStatus,
};
