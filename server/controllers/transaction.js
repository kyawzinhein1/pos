import { Transaction } from "../model/transaction.js";

export const getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(404).json({ message: "Trans not found." });
    }
};

export const addTransaction = async (req, res) => {
    try {
        console.log("Received transaction data:", req.body);

        const { transactionId, products, total, date, time } = req.body;

        // Ensure all fields exist
        if (!transactionId || !products || !total || !date || !time) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for duplicate transaction ID
        const existingTransaction = await Transaction.findOne({ transactionId });
        if (existingTransaction) {
            console.log("Duplicate transaction ID detected:", transactionId);
            return res
                .status(400)
                .json({ message: "Transaction ID already exists." });
        }

        // Create the new transaction
        const newTransaction = await Transaction.create({
            transactionId,
            products,
            total,
            date,
            time,
        });

        console.log("New transaction created:", newTransaction);

        return res.status(201).json({
            message: "Transaction added successfully",
            transaction: newTransaction,
        });
    } catch (error) {
        console.error("Transaction error:", error);
        return res
            .status(500)
            .json({ message: error.message || "Something went wrong." });
    }
};

export const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(404).json({ message: "Trans not found." });
    }
};
