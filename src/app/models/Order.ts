import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    address: {
      type: [
        {
          street: String,
          number: String,
          reference: String,
        },
      ],
      required: false,
    },
    status: {
      type: String,
      enum: ["WAITING", "DONE"],
      default: "WAITING",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Product",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
  })
);
