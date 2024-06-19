import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoute } from '../modules/faculty/faculty.route';
import { AdminRouter } from '../modules/admin/admin.route';
import { CourseRoute } from '../modules/course/course.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { AuthRouters } from '../modules/auth/auth.router';
import { EnrolledCourseRoutes } from '../modules/enrolledCourse/enrolledCourse.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/admins',
    route: AdminRouter,
  },
  {
    path: '/faculties',
    route: FacultyRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoute,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoute,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/enrolled-courses',
    route: EnrolledCourseRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
