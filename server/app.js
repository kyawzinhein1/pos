import express from "express";
import cors from "cors";
import { router } from "./routes/test.js";
import { router as productRoutes } from "./routes/product.js";
import { router as transactionRoutes } from "./routes/transaction.js";
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use("/", router);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes)

export { app };
