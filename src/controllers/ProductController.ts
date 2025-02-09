import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import httpStatus from "http-status";

export const getProducts = async (req: Request, res: Response): Promise<void> => {  // ✅ Added explicit type for req
    const products = await getRepository(Product).find();
    res.json(products);
  };
  

  export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const productRepo = getRepository(Product);
    const { sku, name, price } = req.body;
    const imagePaths = req.files ? (req.files as Express.Multer.File[]).map(file => file.path) : [];
  
    const product = productRepo.create({ sku, name, price, images: imagePaths });
    await productRepo.save(product);
    res.status(201).json(product);
  };

  export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const productRepo = getRepository(Product);
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
  };

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const productRepo = getRepository(Product);
  await productRepo.delete(req.params.id);
  res.status(204).send();
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const productRepo = getRepository(Product);
    console.log(req.params.id);
    
    const product = await productRepo.findOne({ where: { id: parseInt(req.params.id) } });
  
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
  
    res.json(product);
  };
