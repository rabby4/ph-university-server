import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .max(20, { message: 'Password can not be more then 20 characters' }),
  needChangePassword: z.boolean().optional().default(true),
  role: z.enum(['admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDelete: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationSchema,
};
