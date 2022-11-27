import { User } from "./../../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwt_random_key } from "../../../utils/constants";

export async function createUser(req: Request, res: Response) {
  try {
    const { name, phone, password, address } = req.body;

    if (!(phone && password && name && address)) {
      res.status(400).send("All input is required");
    }

    const newPhone = phone.replace(/[^+\d]+/g, "") || phone;

    const oldUser = await User.findOne({ phone: newPhone });
    console.log(oldUser);

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone: newPhone,
      address,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id, phone }, jwt_random_key, {
      expiresIn: "2h",
    });

    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
