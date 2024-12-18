import express from "express";
import userAuth from "../../middlewares/userAuth.js";
import {
  getCartDetails,
  addProductToCart,
  deleteProductFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../../controllers/cartcontrollers.js";

const cartRouter = express.Router();

cartRouter.get("/getcartdetails", userAuth, getCartDetails);
cartRouter.post("/addproducttocart", userAuth, addProductToCart);

cartRouter.put("/increaseproductquantity", userAuth, increaseProductQuantity);
cartRouter.put("/decreaseproductquantity", userAuth, decreaseProductQuantity);

cartRouter.delete("/deleteproductfromcart", userAuth, deleteProductFromCart);

export default cartRouter;
