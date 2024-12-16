import express from "express";
import userAuth from "../../middlewares/userAuth.js";
import adminAuth from "../../middlewares/adminAuth.js";
import {getAllProducts, getProductDetails, aGetAllProducts, aGetProductDetails, createProduct, updateProduct, deactivateProduct } from "../../controllers/productControllers.js";
import upload from "../../middlewares/multer.js";


const productRouter = express.Router();

productRouter.get("/productlist", userAuth, getAllProducts);
productRouter.get("/productdetails/:id", userAuth, getProductDetails);

productRouter.get("/a-productlist", adminAuth, aGetAllProducts);
productRouter.get("/a-productdetails/:id", adminAuth, aGetProductDetails);
productRouter.post("/createproduct", adminAuth, upload.single("image"), createProduct);
productRouter.put("/updateproduct/:id", adminAuth, updateProduct);
productRouter.put("/deactivateproduct/:id", adminAuth, deactivateProduct);





export default productRouter;