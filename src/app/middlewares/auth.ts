import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiErrors';
import { StatusCodes } from 'http-status-codes';
import { JwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    let verifiedUser = null;
    verifiedUser = JwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    console.log(verifiedUser);
    req.user = verifiedUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
