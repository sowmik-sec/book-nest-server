import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserBookStatusValidation } from './userBookStatus.validation';
import { UserBookStatusController } from './userBookStatus.controller';
import auth from '../../middlewares/auth';
import authGuard from '../../middlewares/authGuard';
import { UserBookStatus } from './userBookStatus.model';
const router = express.Router();

router.post(
  '/create-book-status',
  validateRequest(UserBookStatusValidation.createUserBookValidationZodSchema),
  UserBookStatusController.createBookStatus,
);

router.get('/', UserBookStatusController.getBookStatus);

router.patch(
  '/:id',
  auth,
  authGuard(UserBookStatus, 'user'),
  validateRequest(UserBookStatusValidation.updateUserBookValidationZodSchema),
  UserBookStatusController.updateBookStatus,
);

router.delete('/:id', UserBookStatusController.deleteBookStatus);

export const UserBookStatusRoutes = router;
