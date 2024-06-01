import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const TAcademicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAcademicDepartment>(
  'academicDepartment',
  TAcademicDepartmentSchema,
);
