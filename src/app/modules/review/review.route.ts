import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import authGuard from '../../middlewares/authGuard';
import { Review } from './review.model';
const router = express.Router();

router.post(
  '/create-review',
  validateRequest(ReviewValidation.createReviewValidationZodSchema),
  ReviewController.createReview,
);

router.get('/:bookId', ReviewController.getAllReviews);

router.patch(
  '/:id',
  auth,
  authGuard(Review, 'user'),
  validateRequest(ReviewValidation.updateReviewValidationZodSchema),
  ReviewController.updateReview,
);

router.delete('/:id', authGuard(Review, 'user'), ReviewController.deleteReview);

export const ReviewRoutes = router;
