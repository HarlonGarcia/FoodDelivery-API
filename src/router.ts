import path from "node:path";
import { Router } from "express";
import multer from "multer";

import { verifyToken as auth } from "./app/middleware/auth";
import { createCategory } from "./app/useCases/categories/createCategory";
import { listCategories } from "./app/useCases/categories/listCategories";
import { createProduct } from "./app/useCases/products/createProduct";
import { listProducts } from "./app/useCases/products/listProducts";
import { listProductsByCategory } from "./app/useCases/categories/listProductsByCategory";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrder } from "./app/useCases/orders/createOrder";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrderById } from "./app/useCases/orders/cancelOrderById";
import { deleteProductById } from "./app/useCases/products/deleteProductById";
import { deleteCategoryById } from "./app/useCases/categories/deleteCategoryById";
import { createUser } from "./app/useCases/users/createUser";
import { loginUser } from "./app/useCases/users/loginUser";
import { listUsers } from "./app/useCases/users/listUsers";
import { findUserByPhone } from "./app/useCases/users/findUserByPhone";
import { deleteUserById } from "./app/useCases/users/deleteUserById";

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
