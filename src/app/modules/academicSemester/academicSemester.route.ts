import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// will call controller function
router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get(
  '/',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getAllAcademicSemesters,
);
router.get(
  '/:academicSemesterId',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:academicSemesterId',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoute = router;
