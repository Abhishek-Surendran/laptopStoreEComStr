import express from "express";
const v1Router = express.Router();

import userRouter from "./userRoutes.js";
import productRouter from "./productRoutes.js";
import orderRouter from "./orderRoutes.js";
import cartRouter from "./cartRoutes.js";
import reviewRouter from "./reviewRoutes.js";

v1Router.use("/user", userRouter);
v1Router.use("/product", productRouter);
v1Router.use("/order", orderRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/review", reviewRouter )

export default v1Router;
