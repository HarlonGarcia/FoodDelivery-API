import { model, Schema } from "mongoose";

export const Order = model(
  "Order",
  new Schema({
    user: {
      _id: {
        type: String,
        required: true,
      },
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
        reference: {
          type: String,
          required: false,
        },
      },
    },
    status: {
      type: String,
      enum: ["WAITING", "IN_PRODUCTION", "DONE"],
      default: "WAITING",
    },
    createdAt: {
      type: Date,
      default: new Date(),
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
