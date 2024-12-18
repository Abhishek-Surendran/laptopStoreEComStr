import express from "express";
import {
  signup,
  login,
  userProfile,
  userLogout,
  checkUser,
  updateUser,
  deactivateUser,
  getAllUsers,
} from "../../controllers/userControllers.js";
import userAuth from "../../middlewares/userAuth.js";
import adminAuth from "../../middlewares/adminAuth.js";

const userRouter = express.Router();

// User Routes
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/profile", userAuth, userProfile);
userRouter.get("/logout", userAuth, userLogout);
userRouter.get("/check-user", userAuth, checkUser);
userRouter.put("/updateProfile", userAuth, updateUser);
userRouter.put("/deactivateuser/:id", userAuth, deactivateUser);

// Admin Routes
userRouter.get("/getallusers", adminAuth, getAllUsers);

export default userRouter;
