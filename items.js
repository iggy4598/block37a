const express = require('express');
const { getItems, getItem, getReview } = require('./database');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await getItems();
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.get('/:itemId', async (req, res, next) => {
  try {
    const item = await getItem(req.params.itemId);
    res.json(item);
  } catch (error) {
    next(error);
  }
});

router.get('/:itemId/reviews', async (req, res, next) => {
  try {
    const reviews = await getReview(req.params.itemId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;