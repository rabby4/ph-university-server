import { z } from 'zod';

// UserName schema
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name is not more than 20 characters' })
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
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    }),
});

// Guardian schema
const createGuardianValidationSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian schema
const createLocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    student: z.object({
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
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      // profileImg: z.string().url().optional(),
      academicDepartment: z.string(),
    }),
  }),
});

// UserName schema for update
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name is not more than 20 characters' })
    .trim()
    .refine(
      (value) =>
        value.charAt(0) === value.charAt(0).toUpperCase() &&
        /^[A-Za-z]+$/.test(value),
      {
        message: 'First name must be capitalized and contain only alphabets',
      },
    )
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name must contain only alphabets',
    })
    .optional(),
});

// Guardian schema for update
const updateGuardianValidationSchema = z.object({
  fatherName: z.string().trim().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

// LocalGuardian schema for update
const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

// Student schema for update
const updateStudentValidationSchema = z.object({
  body: z.object({
    // password: z.string().max(20).optional(),
    student: z.object({
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
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().url().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
