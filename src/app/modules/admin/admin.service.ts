import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import AppError from '../../error/appError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedAdminData: Record<string, unknown> = {
    ...remainingAdminData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedAdminData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedAdminData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDelete: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    // get user _id from deleteAdmin
    const userId = deletedAdmin.user;
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDelete: true },
      { new: true, session },
    );

    if (!deleteUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
