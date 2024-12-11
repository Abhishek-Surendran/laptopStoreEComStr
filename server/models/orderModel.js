import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User ",
        },
        orderItems: [
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
        shippingAddress: {
            type: String, 
            required: true,
        },
        OrderStatus: {
            type: String,
            required: true,
            enum: ["Payment Confirmed", "In Transit", "Delivered", "Rejected"], 
            default: "Payment Confirmed",
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0, 
            min: 0, 
        },
    },
    {
        timestamps: true,
    }
);

export const Order = mongoose.model("Order", orderSchema);