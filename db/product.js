import mongoose from "mongoose"
import User from "./user.js"
import { getBarcode } from "./utils.js"

const productSchema = new mongoose.Schema({
  // username: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
  uid: { type: String, required: true },
  barcode: { type: String },
})

productSchema.pre("save", async function (next) {
  const product = this
  if (product.isModified("uid")) {
    product.barcode = await getBarcode(product.uid)
  }
  next()
})

const Product = mongoose.model("products", productSchema)

export default Product
