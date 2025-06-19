import { Router } from "express";
import { addTransaction, getTransaction, getTransactionById } from "../controllers/transaction.js";

const router = Router();

router.get("/", getTransaction);
router.post("/", addTransaction);
// router.get("/:id", getTransactionById);

export { router };
