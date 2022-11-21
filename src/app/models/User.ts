import { model, Schema } from "mongoose";

export const User = model(
  "User",
  new Schema({
    name: {
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
          required: true,
          ref: "Order",
        },
      },
    ],
  })
);
