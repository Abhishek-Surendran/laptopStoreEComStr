import express from "express";
import {signup, login, userProfile, userLogout, checkUser}  from "../../controllers/userControllers.js";
import userAuth from "../../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.get("/profile",userAuth, userProfile);
userRouter.get("/logout", userAuth, userLogout);
userRouter.get("/check-user", userAuth, checkUser);
userRouter.put("/update-profile", userAuth, );
userRouter.put("/deactivate", userAuth, );




export default userRouter;