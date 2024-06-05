import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../error/appError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utils';
import mongoose from 'mongoose';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // if password is not given, use default password
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  // Transaction and rollback steps:
  // 1. create session
  // 2. start transaction
  // 3. send the session when create and send data as array
  // 4. commit transaction
  // 5. end session
  // 6. if the session failed: abortTransaction and end session

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // set generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user!');
    }
    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create student (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Student!',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Filed to create Student');
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create user data
  const userData: Partial<TUser> = {};

  // if password not given then use default password
  userData.password = password || (config.default_pass as string);

  // set faculty role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission department not found');
  }

  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // set user id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create new faculty
    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new Faculty!',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Filed to create Faculty');
  }
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
