import { z } from 'zod';

const createUserBookValidationZodSchema = z.object({
  body: z.object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ObjectId'),
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Book ObjectId'),
    status: z.enum(['wishlist', 'reading', 'finished'], {
      required_error: 'Status is required',
    }),
  }),
});
const updateUserBookValidationZodSchema = z.object({
  body: z.object({
    status: z.enum(['wishlist', 'reading', 'finished'], {
      required_error: 'Status is required',
    }),
  }),
});

export const UserBookStatusValidation = {
  createUserBookValidationZodSchema,
  updateUserBookValidationZodSchema,
};
