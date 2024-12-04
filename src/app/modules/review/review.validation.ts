import { z } from 'zod';

const reviewValidationSchema = z.object({
  body: z.object({
    book: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Book ObjectId'),
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid User ObjectId'),
    comment: z
      .string()
      .min(1, 'Comment is required')
      .max(500, 'Comment must be less than 500 characters'),
  }),
});

export const ReviewValidation = {
  reviewValidationSchema,
};
