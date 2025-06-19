import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema(
    {
        transactionId: {
            type: String,
            required: true,
            unique: true,
        },
        products: {
            type: Array,
            required: true,
            unique: false,
        },
        total: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
