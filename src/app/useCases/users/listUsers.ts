import { User } from "./../../models/User";
import { Request, Response } from "express";

export async function listUsers(req: Request, res: Response) {
  try {
    const users = await User.find().sort({ name: 1 }).populate("orders.order");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
