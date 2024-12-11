import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^(http|https):\/\/[^ "]+$/.test(v);
                },
                message: props => `${props.value} is not a valid URL!`
            },
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
    },
    {
        timestamps: true,
    }
);

export const Product = mongoose.model("Product", productSchema);