const express = require("express");
const jwt = require("jsonwebtoken");
const { createUser, loginUser, getUser } = require("./database");

const router = express.Router();

const isLoggedIn = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUser(id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
    console.error("Registration Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await loginUser(username, password);
    if (!user) return res.status(401).send("Invalid login credentials.");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    next(error);
  }
});

router.get("/me", isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  router,
  isLoggedIn,
};
