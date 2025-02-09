import { Router,Request, Response } from "express";
import multer from "multer";
import { getProducts, createProduct,getProductById, updateProduct, deleteProduct } from "../controllers/ProductController";

const router = Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req :Request, file :any, cb:any) => {
    cb(null, "uploads/"); // Store images in an "uploads" folder
  },
  filename: (req :Request, file:any, cb:any) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", upload.array("images", 5), createProduct);  // Accept multiple files
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
