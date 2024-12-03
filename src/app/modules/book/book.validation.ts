import { z } from 'zod';

// Zod schema for IBook
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    author: z.string().min(1, 'Author is required'),
    genre: z.string().min(1, 'Genre is required'),
    publicationDate: z.date({
      required_error: 'Publication date is required',
      invalid_type_error: 'Invalid date format',
    }),
    bookAddedBy: z
      .string()
      .min(1, 'User ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'), // Only accept MongoDB ObjectId as a string
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required').optional(),
    author: z.string().min(1, 'Author is required').optional(),
    genre: z.string().min(1, 'Genre is required').optional(),
    publicationDate: z
      .date({
        required_error: 'Publication date is required',
        invalid_type_error: 'Invalid date format',
      })
      .optional(),
    bookAddedBy: z
      .string()
      .min(1, 'User ID is required')
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
