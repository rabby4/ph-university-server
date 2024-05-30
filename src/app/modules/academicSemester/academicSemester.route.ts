import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();

// will call controller function
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
router.get(
  '/:academicSemesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:academicSemesterId',
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;
