/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';
import ApiError from '../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';

const authGuard =
  (model: Model<any>, ownershipField: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await model.findById(id);
      if (!resource) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Resource not found');
      }
      if (String(resource[ownershipField]) !== req.user.id) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized user');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default authGuard;
