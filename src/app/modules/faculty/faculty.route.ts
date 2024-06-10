import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyController } from './faculty.controller';
import { facultyValidations } from './faculty.validation';
import auth from '../../middleware/auth';

const router = express.Router();

// will call controller function

router.get('/', auth(), FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoute = router;
