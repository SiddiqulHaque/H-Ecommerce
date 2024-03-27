import { Schema, model, models } from "mongoose";
const buyerSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
    required: [true, "Email is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
  },
  image: {
    type: String,
  },
});
const Buyer = models.Buyer || model("Buyer", buyerSchema);
export default Buyer;
