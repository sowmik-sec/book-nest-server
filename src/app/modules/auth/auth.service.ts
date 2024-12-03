import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUser = async (
  loginData: ILoginUser,
): Promise<ILoginUserResponse> => {
  const isUserExist = await User.isUserExist(loginData.email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
  }
  const isPasswordMatched = User.isPasswordMatched(
    loginData.password,
    isUserExist.password,
  );
  if (!isPasswordMatched) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized user');
  }
  const { email } = loginData;
  const accessToken = JwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string,
  );
  const refreshToken = JwtHelpers.createToken(
    { email },
    config.jwt.refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_id as string,
  );
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, `Invalid refresh token ${error}`);
  }
  // check deleted user's refresh token
  const { email } = verifiedToken;
  const isUserExist = await User.isUserExist(email);
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = JwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string,
  );
  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
