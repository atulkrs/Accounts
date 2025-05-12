const express = require("express");
const { register, login } = require("../Controller/userController.js");

const userRouter = express.Router();

// userRouter.post('/user', handleGetUser);
userRouter.post("/register", register);
userRouter.post("/login", login);
// userRouter.delete('/delete', handleDelete);
// userRouter.get('/:userId', handleUser);

module.exports = userRouter;
