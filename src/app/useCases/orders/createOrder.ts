import { Request, Response } from "express";
import { Order } from "../../models/Order";
import { io } from "../../../index";
import { User } from "../../models/User";

export async function createOrder(req: Request, res: Response) {
  try {
    const { user, products } = req.body;

    const order = await Order.create({
      user,
      products,
    });

    const userFound = await User.findById(user._id);

    if (userFound) {
      const userOrders = [
        ...userFound.orders,
        {
          order: order._id,
        },
      ];

      await User.findByIdAndUpdate(userFound._id, { orders: userOrders });
    }

    const orderDetails = await order.populate("products.product");

    io.emit("orders@new", orderDetails);
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
