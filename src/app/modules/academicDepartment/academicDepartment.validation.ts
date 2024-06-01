import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicDepartment: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Academic department is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicDepartment: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic department is required',
      })
      .optional(),
  }),
});
export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
