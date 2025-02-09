const express = require('express');
const { getSpecificReview, createReview, getReviews, updateReview } = require('./database');
const { isLoggedIn } = require('./auth');

const router = express.Router();

router.get('/:itemId/:reviewId', async (req, res, next) => {
  try {
    const review = await getSpecificReview(req.params.itemId, req.params.reviewId);
    res.json(review);
  } catch (error) {
    next(error);
  }
});

router.post('/:itemId', isLoggedIn, async (req, res, next) => {
  try {
    const { reviewText, rating } = req.body;
    const newReview = await createReview(req.params.itemId, reviewText, req.user.id, rating);
    res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
});

router.get('/me', isLoggedIn, async (req, res, next) => {
  try {
    const reviews = await getReviews(req.user.id);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.put('/:reviewId', isLoggedIn, async (req, res, next) => {
  try {
    const updatedReview = await updateReview(req.user.id, req.params.reviewId, req.body.reviewText);
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
});

module.exports = router;