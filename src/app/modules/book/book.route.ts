import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import authGuard from '../../middlewares/authGuard';
import { Book } from './book.model';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);

router.get('/', auth, BookController.getAllBooks);

router.get('/:id', auth, BookController.getSingleBook);

router.patch(
  '/:id',
  auth,
  authGuard(Book, 'bookAddedBy'),
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBook,
);

router.delete(
  '/:id',
  authGuard(Book, 'bookAddedBy'),
  BookController.deleteBook,
);

export const BookRoutes = router;
