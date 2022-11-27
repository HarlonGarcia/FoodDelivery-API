import { Request, Response } from "express";
import { User } from "../../models/User";

export async function findUserByPhone(req: Request, res: Response) {
  try {
    const { phone } = req.params;

    const user = await User.findOne({ phone });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
