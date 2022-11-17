import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function createOrder(req: Request, res: Response) {
  try {
    const { address, products } = req.body;

    const order = await Order.create({
      address,
      products,
    });
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
