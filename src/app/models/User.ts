import { model, Schema } from "mongoose";

export const User = model(
  "User",
  new Schema({
    token: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
      reference: String,
    },
    orders: [
      {
        order: {
          type: Schema.Types.ObjectId,
          required: false,
          ref: "Order",
        },
      },
    ],
  })
);
