import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        cartItems: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                qty: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true, default: 0 },
            },
        ],
        totalPrice: {
            type: Number,
            required: true,
            default: 0, 
            min: 0,
        },
    },
    { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);