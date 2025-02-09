import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { Product } from "../entities/Product";  // Ensure correct import path
import httpStatus from "http-status";

// Import the initialized DataSource (use the correct path if needed)
import { dataSource } from "../../datasource"; // Modify this path to point to your DataSource initialization file

// Get all products
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const productRepo = dataSource.getRepository(Product); // ✅ Use DataSource to get the repository
    const products = await productRepo.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productRepo = dataSource.getRepository(Product); // ✅ Use DataSource to get the repository
    const { sku, name, price } = req.body;
    const imagePaths = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];

    const product = productRepo.create({ sku, name, price, images: imagePaths });
    await productRepo.save(product);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productRepo = dataSource.getRepository(Product); // ✅ Use DataSource to get the repository
    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const { sku, name, price } = req.body;
    const imagePaths = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : product.images;

    productRepo.merge(product, { sku, name, price, images: imagePaths });
    await productRepo.save(product);
    res.json(product);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productRepo = dataSource.getRepository(Product); // ✅ Use DataSource to get the repository
    await productRepo.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productRepo = dataSource.getRepository(Product); // ✅ Use DataSource to get the repository
    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product by ID", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
