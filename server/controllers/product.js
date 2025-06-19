import { Product } from "../model/product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Products not found.",
        });
    }
};

// Get Product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching product", error });
    }
};

// Add New Product
export const addProduct = async (req, res) => {
    try {
        console.log("Received request body:", req.body);

        const { productName, category, price, stock } = req.body;

        if (!productName || !category || price == null || stock == null) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if a product with the same name exists
        const existingProduct = await Product.findOne({ productName });

        if (existingProduct) {
            return res.status(409).json({ message: "Product name already exists" });
        }

        // Create a new product
        const newProduct = new Product({
            productName,
            category,
            price,
            stock,
        });

        await newProduct.save(); // Save the new product

        return res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });
    } catch (error) {
        console.error("Error adding product:", error);  // Log full error object
        return res.status(500).json({ message: "Error adding product", error: error.message });
    }
};


// Update Product
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = req.body;

    if (!id) {
        return res.status(400).json({ message: "Invalid product id" });
    }
    if (!updatedProduct) {
        return res.status(400).json({ message: "Invalid product data" });
    }

    try {
        const product = await Product.findByIdAndUpdate(id, updatedProduct, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res
            .status(201)
            .json(product);
    } catch (error) {
        res.status(500).json({ error: "Error updating product" });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct)
            return res.status(404).json({ message: "Product not found" });

        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Error deleting product", error: error.message });
    }
};
