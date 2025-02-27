const { prisma } = require("./database");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./database");
const bcrypt = require("bcrypt");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "error!" });
};

const authMiddleware = {
  isLoggedIn: async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      req.user = await prisma.user.findUnique({ where: { id } });
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid token" });
    }
  },
};

const authController = {
  registerUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '8h' });
      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: "Error registering" });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(403).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: "Error logging in" });
    }
  },
  getMe: async (req, res) => {
    res.json(req.user);
  },
};
const itemController = {
  getAllItems: async (req, res) => {
    const items = await prisma.item.findMany();
    res.json(items);
  },
  getItemById: async (req, res) => {
    const item = await prisma.item.findUnique({
      where: { id: Number(req.params.itemId) },
    });
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  },
};
const commentController = {
  getCommentsByReview: async (req, res) => {
    const comments = await prisma.comment.findMany({
      where: { reviewId: Number(req.params.reviewId) },
    });
    res.json(comments);
  },
  createComment: async (req, res) => {
    const { content } = req.body;
    const newComment = await prisma.comment.create({
      data: {
        content,
        reviewId: Number(req.params.reviewId),
        userId: req.user.id,
      },
    });
    res.status(201).json(newComment);
  },
  getMyComments: async (req, res) => {
    const comments = await prisma.comment.findMany({
      where: { userId: req.user.id },
    });
    res.json(comments);
  },
  updateComment: async (req, res) => {
    const { content } = req.body;
    const updatedComment = await prisma.comment.update({
      where: { id: Number(req.params.commentId), userId: req.user.id },
      data: { content },
    });
    res.json(updatedComment);
  },
  deleteComment: async (req, res) => {
    await prisma.comment.delete({
      where: { id: Number(req.params.commentId), userId: req.user.id },
    });
    res.status(204).send();
  },
};

module.exports = {
  errorHandler,
  authMiddleware,
  authController,
  itemController,
  commentController,
};