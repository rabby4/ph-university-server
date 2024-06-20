import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { EnrolledCourseValidation } from './enrolledCourse.validation';
import { EnrolledCourseController } from './enrolledCourse.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidation.createEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.createEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth(USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidation.updateEnrolledCourseValidationSchema,
  ),
  EnrolledCourseController.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
