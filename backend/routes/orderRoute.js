import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import {
  createOrderController,
  deleteOrderController,
  getAllOrdersController,
  getSingleOrderController,
  myOrdersController,
  updateOrderController,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticated, createOrderController);
router.route("/orders").get(isAuthenticated, myOrdersController);
router.route("/order/:id").get(isAuthenticated, getSingleOrderController);

//admin

router
  .route("/admin/orders")
  .get(isAuthenticated, authorizeRoles("admin"), getAllOrdersController);

router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateOrderController)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteOrderController);

export default router;
