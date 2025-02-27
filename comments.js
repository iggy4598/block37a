const express = require('express');
const { createComment, getComments, updateComment, deleteComment } = require('./database');
const { isLoggedIn } = require('./auth');

const router = express.Router();

router.post('/:itemId/:reviewId', isLoggedIn, async (req, res, next) => {
  try {
    const newComment = await createComment(req.params.itemId, req.params.reviewId, req.body.commentText, req.user.id);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
});
router.get('/me', isLoggedIn, async (req, res, next) => {
  try {
    const comments = await getComments(req.user.id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});
router.put('/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    const updatedComment = await updateComment(req.user.id, req.params.commentId, req.body.commentText);
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
});
router.delete('/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    await deleteComment(req.user.id, req.params.commentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;