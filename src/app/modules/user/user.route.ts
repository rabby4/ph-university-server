import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { UserController } from './user.controller';
import { facultyValidations } from '../faculty/faculty.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

export const UserRoutes = router;
