import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
            unique: true,
        },
        cartItems: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                qty: { type: Number, required: true, default: 0, min: 0 },
                price: { type: Number, required: true, default: 0, min: 0 },
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

cartSchema.methods = {
    async calculateTotalPrice() {
        const totalPrice = this.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        this.totalPrice = totalPrice;
        await this.save();
    },
};

export const Cart = mongoose.model("Cart", cartSchema);