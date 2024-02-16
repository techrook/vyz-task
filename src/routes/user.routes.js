const { Router } = require("express");
const userRouter = Router();

const {
  createUser,
  loginUser,
  inputName,
} = require("../controllers/user.controller");
const auth = require("../middlewares/authentication");

userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.patch("/inputname/:id", auth, inputName);
module.exports = userRouter;
