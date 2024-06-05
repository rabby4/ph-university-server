import { z } from 'zod';

// UserName schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .trim()
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        /^[A-Za-z]+$/.test(value),
      {
        message: 'First name must be capitalized and contain only alphabets',
      },
    ),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim(),
});

// Faculty schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      designation: z.string(),
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string(),
    }),
  }),
});

// UserName schema for update
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim().optional(),
  middleName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// Faculty schema for update
const updateFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    faculty: z.object({
      designation: z.string().optional(),
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
