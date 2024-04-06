const { Schema, models, model, default: mongoose } = require("mongoose");

const orderSchema = new Schema(
  {
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderBy: { type: mongoose.Schema.Types.ObjectId, ref: "Buyer" },
    name: String,
    email: String,
    city: String,
    pCode: String,
    address: String,
    state: String,
    amount: Number,
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
export const Orders = models?.Orders || model("Orders", orderSchema);
