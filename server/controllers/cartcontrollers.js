import { Cart } from "../models/cartModel.js";
import { Product } from '../models/productModel.js';

export const getCartDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({ userId: userId }).populate("cartItems.productId");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        } 

        res.status(200).json({ message: "Cart fetched successfully", data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(productId);

        if (!product) { 
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            cart = new Cart({ userId , cartItems: [] });
        }


        const productExists = cart.cartItems.some(item => item.productId.equals(productId));
        if (productExists) {
            return res.status(400).json({ message: "Product already exists in the cart" });
        }

        cart.cartItems.push({ productId, qty: 1, price: product.price });
        await cart.save();

        cart.calculateTotalPrice();
       

        res.status(200).json({ message: "Product added to cart successfully", data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.status || 500).json({ message: error.message || "Internal server error" });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        
        cart.cartItems = cart.cartItems.filter((item) => !item.productId.equals(productId));

        
        cart.calculateTotalPrice();

        
        await cart.save();

        res.status(200).json({ message: "cart item removed", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const increaseProductQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;
        

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        let cart = await Cart.findOne({ userId: userId }).populate("cartItems.productId");
        console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        
        const product = cart.cartItems.find((item) => item.productId.equals(productId));
        if (!product) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        product.qty += 1;

        if (product.qty >= product.stock) {
            return res.status(400).json({ message: "Cannot exceed available stock" });
        }        

        cart.calculateTotalPrice();
        
        await cart.save();

        res.status(200).json({ message: "Product quantity increased", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


export const decreaseProductQuantity = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        let cart = await Cart.findOne({ userId }).populate('cartItems.productId');
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        
        const product = cart.cartItems.find((item) => item.productId.equals(productId));
        if (!product) {
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        product.qty -= 1;

        if (product.qty < 1) {
            return res.status(400).json({ message: "Quantity cannot be less than 1" });
        }

        cart.calculateTotalPrice();
        
        await cart.save();

        res.status(200).json({ message: "Product quantity decreased", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};