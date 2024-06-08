import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.assignFacultyWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseController.removeFacultyFromCourse,
);

export const CourseRoute = router;
