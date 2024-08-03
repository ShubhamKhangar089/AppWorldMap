const { logoutUser, userLogin, userRegister } = require("../controllers/userController")

const express = require("express");

const usersRouter = express.Router();

usersRouter.post("/login", userLogin);

usersRouter.post("/register", userRegister);

usersRouter.post("/logout", logoutUser);

usersRouter.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { usersRouter };