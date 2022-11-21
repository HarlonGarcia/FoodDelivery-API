import { User } from "./../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginUser(req: Request, res: Response) {
  try {
    const { phone, password } = req.body;

    if (!(phone && password)) {
      res.status(400).send("All input is required");
    }

    const newPhone = phone.replace(/[^+\d]+/g, "");
    const user = await User.findOne({ newPhone });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, newPhone },
        "fooddeliveryapi",
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }
    res.status(400).send("Invalid credentials");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
