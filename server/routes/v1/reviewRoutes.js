import express from "express";
import userAuth from "../../middlewares/userAuth.js";
import {
  getProductReviews,
  addReview,
  getAverageRating,
  deleteReview,
} from "../../controllers/reviewControllers.js";

const reviewRouter = express.Router();

reviewRouter.get("/getreviews", userAuth, getProductReviews);
reviewRouter.post("/addproductreview", userAuth, addReview);
reviewRouter.get("/getavgrating", userAuth, getAverageRating);
reviewRouter.delete("/deletereview", userAuth, deleteReview);

export default reviewRouter;
