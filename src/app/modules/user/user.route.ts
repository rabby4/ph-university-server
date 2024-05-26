import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { studentValidations } from '../student/student.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

export const UserRoutes = router;
