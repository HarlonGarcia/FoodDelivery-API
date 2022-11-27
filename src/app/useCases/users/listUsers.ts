import { User } from "./../../models/User";
import { Request, Response } from "express";

export async function listUsers(req: Request, res: Response) {
  try {
    const products = await User.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
