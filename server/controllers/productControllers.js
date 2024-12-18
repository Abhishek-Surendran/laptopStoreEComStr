import { Product } from "../models/productModel.js";
import cloudinary from "../config/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const productList = await Product.find({ isActive: true }).select(
      "title image price"
    );

    if (productList.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: productList });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { title, description, image, category, price, countInStock } = req.body;
  try {
    if (!title || !description || !category || !price || !countInStock) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "lapStore",
    });

    if (!uploadResult) {
      return res.status(400).json({ message: "Image upload failed" });
    }

    const productExists = await Product.findOne({ title });
    if (productExists) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const product = await Product.create({
      title,
      description,
      image: uploadResult.url,
      category,
      price,
      countInStock,
    });
    res
      .status(201)
      .json({ message: "Product created successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const deactivateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product deactivated successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const reactivateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findByIdAndUpdate(
      productId,
      { isActive: true },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product reactivated successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const aGetProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const aGetAllProducts = async (req, res) => {
  try {
    const productList = await Product.find().select(
      "title image price isActive"
    );

    if (productList.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res
      .status(200)
      .json({ message: "Products fetched successfully", data: productList });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
