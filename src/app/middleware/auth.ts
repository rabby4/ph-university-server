import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/appError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // if the token is send from the client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    let decoded;
    try {
      // check if the token is valid or not
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const { userId, role, iat } = decoded;

    // checking if the user is exists
    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user not found!');
    }

    // checking if the user is deleted
    const isDeleted = user?.isDelete;
    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    //checking if the user is deleted
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    if (
      user.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }
    // decoded undefined
    req.user = decoded as JwtPayload;
    next();

    //     // check if the token is valid or not
    //     jwt.verify(
    //       token,
    //       config.jwt_access_token as string,
    //       function (err, decoded) {
    //         // err
    //         if (err) {
    //           throw new AppError(
    //             httpStatus.UNAUTHORIZED,
    //             'You are not authorized!',
    //           );
    //         }
    //
    //         const role = (decoded as JwtPayload).role;
    //         if (requiredRoles && !requiredRoles.includes(role)) {
    //           throw new AppError(
    //             httpStatus.UNAUTHORIZED,
    //             'You are not authorized!',
    //           );
    //         }
    //         // decoded undefined
    //         req.user = decoded as JwtPayload;
    //         next();
    //       },
    // );
  });
};

export default auth;
