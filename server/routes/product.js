import { Router } from "express";
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
} from "../controllers/product.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id",getProductById)
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export { router };
