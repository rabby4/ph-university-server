import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDB = async () => {
  const allAcademicSemesters = await AcademicSemester.find();
  return allAcademicSemesters;
};

const getSingleAcademicSemesterFromDB = async (academicSemesterId: string) => {
  const singleAcademicSemester =
    await AcademicSemester.findById(academicSemesterId);
  return singleAcademicSemester;
};

const updateAcademicSemesterById = async (academicSemesterId: string) => {
  const updateAcademicSemester =
    await AcademicSemester.findByIdAndUpdate(academicSemesterId);
  return updateAcademicSemester;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterById,
};
