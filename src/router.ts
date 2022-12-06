import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { verifyToken as auth } from "./app/middleware/auth";
import { createCategory } from "@usecases/categories/createCategory";
import { listCategories } from "@usecases/categories/listCategories";
import { createProduct } from "@usecases/products/createProduct";
import { listProducts } from "@usecases/products/listProducts";
import { listProductsByCategory } from "@usecases/categories/listProductsByCategory";
import { listOrders } from "@usecases/orders/listOrders";
import { createOrder } from "@usecases/orders/createOrder";
import { changeOrderStatus } from "@usecases/orders/changeOrderStatus";
import { cancelOrderById } from "@usecases/orders/cancelOrderById";
import { deleteProductById } from "@usecases/products/deleteProductById";
import { deleteCategoryById } from "@usecases/categories/deleteCategoryById";
import { createUser } from "@usecases/users/createUser";
import { loginUser } from "@usecases/users/loginUser";
import { listUsers } from "@usecases/users/listUsers";
import { findUserByPhone } from "@usecases/users/findUserByPhone";
import { deleteUserById } from "@usecases/users/deleteUserById";

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, "..", "uploads"));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

router.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Register
router.post("/register", createUser);

// Login
router.post("/login", loginUser);

// List users
router.get("/users", listUsers);

// Find user by phone
router.get("/users/:phone", findUserByPhone);

// Delete user by id
router.get("/users/:userId", deleteUserById);

// List categories
router.get("/categories", listCategories);

// Create category
router.post("/categories", createCategory);

// Delete category
router.delete("/categories/:categoryId", deleteCategoryById);

// List products
router.get("/products", listProducts);

// Create product
router.post("/products", upload.single("image"), createProduct);

// List products by category
router.get("/categories/:categoryId/products", listProductsByCategory);

// Delete product
router.delete("/products/:productId", deleteProductById);

// List orders
router.get("/orders", listOrders);

// Create order
router.post("/orders", auth, createOrder);

// Change order status
router.patch("/orders/:orderId", changeOrderStatus);

// Cancel order
router.delete("/orders/:orderId", cancelOrderById);
