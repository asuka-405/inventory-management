import mongoose from "mongoose"
import User from "./user.js"
import { getBarcode } from "./utils.js"

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body_html: { type: String, default: "" },
  vendor: { type: String, default: "" },
  product_type: { type: String, default: "" },
  tags: { type: String, default: "" },
  variants: [
    {
      price: { type: String },
      barcode: { type: String, default: "0000000000" },
      inventory_quantity: { type: Number, default: 100 },
      compare_at_price: { type: String },
    },
  ],
  images: [
    {
      src: { type: String },
      position: { type: Number, default: 1 },
    },
  ],
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
