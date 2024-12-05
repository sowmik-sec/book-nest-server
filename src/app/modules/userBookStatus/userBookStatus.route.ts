import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserBookStatusValidation } from './userBookStatus.validation';
import { UserBookStatusController } from './userBookStatus.controller';
const router = express.Router();

router.post(
  '/create-book-status',
  validateRequest(UserBookStatusValidation.createUserBookValidationZodSchema),
  UserBookStatusController.createBookStatus,
);

router.get('/', UserBookStatusController.getBookStatus);

router.patch(
  '/:id',
  validateRequest(UserBookStatusValidation.updateUserBookValidationZodSchema),
  UserBookStatusController.updateBookStatus,
);

router.delete('/:id', UserBookStatusController.deleteBookStatus);

export const UserBookStatusRoutes = router;
