import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewController } from './review.controller';
const router = express.Router();

router.post(
  '/create-book',
  validateRequest(ReviewValidation.createReviewValidationZodSchema),
  ReviewController.createReview,
);

router.get('/', ReviewController.getAllReviews);

router.patch(
  '/:id',
  validateRequest(ReviewValidation.updateReviewValidationZodSchema),
  ReviewController.updateReview,
);

router.delete('/:id', ReviewController.deleteReview);

export const BookRoutes = router;
