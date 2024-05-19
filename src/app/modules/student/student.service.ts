import { StudentModel } from '../student.model';
import { Student } from './student.interface';

const createStudentIntoDB = async (studentData: Student) => {
  //const result = await StudentModel.create(student); // build in static method provide by mongoose
  const student = new StudentModel(studentData);
  const result = student.save(); // build in instance method provide by mongoose
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
