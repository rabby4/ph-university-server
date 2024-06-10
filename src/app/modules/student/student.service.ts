import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableField } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  //   let searchTerm = '';
  //
  //   if (query?.searchTerm) {
  //     searchTerm = query?.searchTerm as string;
  //   }
  // filtering
  //   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  //   excludeFields.forEach((el) => delete queryObj[el]);
  //
  //   const searchQuery = Student.find({
  //     $or: studentSearchableField.map((field) => ({
  //       [field]: { $regex: searchTerm, $options: 'i' },
  //     })),
  //   });
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  // let sort = '-createdAt';
  // sorting
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // limitation
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // paginate
  //   if (query.page) {
  //     page = Number(query.page);
  //     skip = (page - 1) * limit;
  //   }
  //
  //   const paginateQuery = sortQuery.skip(skip);
  //
  //   const limitQuery = paginateQuery.limit(limit);
  //
  //   let field = '-__v';
  //
  //   if (query.fields) {
  //     field = (query.fields as string).split(',').join(' ');
  //   }
  //
  //   const fieldQuery = await limitQuery.select(field);
  // return fieldQuery;

  const studentsQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentsQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedStudentData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedStudentData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedStudentData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedStudentData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedStudentData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
