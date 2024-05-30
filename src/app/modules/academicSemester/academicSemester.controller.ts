import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });
});

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const allAcademicSemesters =
    await AcademicSemesterServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieve all academic semesters',
    data: allAcademicSemesters,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const singleAcademicSemester =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
      academicSemesterId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully retrieve a academic semester data',
    data: singleAcademicSemester,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemesterId } = req.params;
  const updatedAcademicSemester =
    await AcademicSemesterServices.updateAcademicSemesterById(
      academicSemesterId,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester updated successfully',
    data: updatedAcademicSemester,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
