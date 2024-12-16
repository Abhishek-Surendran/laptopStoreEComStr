import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ["Productivity", "Gaming", "Workstation", "Chromebook"],
        },
        price: {
            type: Number,
            required: true,
            min: 0, 
        },
        countInStock: {
            type: Number,
            required: true,
            min: 0, 
            default: 0, 
        },
        isActive:{
            type: Boolean,
            required: true,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);