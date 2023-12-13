import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const shopifyKey = process.env.SF_ADMIN_API_TOKEN
const shopifyAPIVersion = "2023-07"
const shopifyTLD = `https://${process.env.SF_STORE_NAME}.myshopify.com/admin/api/${shopifyAPIVersion}`

export async function getProduct() {
  return await axios({
    method: "get",
    url: `${shopifyTLD}/products.json`,
    headers: {
      "X-Shopify-Access-Token": shopifyKey,
      "Content-Type": "application/json",
    },
  }).then((res) => res.data)
}

export async function uploadProduct(product) {
  return await axios({
    method: "post",
    url: `${shopifyTLD}/products.json`,
    headers: {
      "X-Shopify-Access-Token": shopifyKey,
      "Content-Type": "application/json",
    },
    data: {
      product,
    },
  })
}

export function getProductFromUserBody(body) {
  return {
    title: body.title,
    body_html: body.body_html || "",
    vendor: body.vendor || "",
    product_type: body.product_type || "",
    tags: body.tags || "",
    variants: [
      {
        price: getPriceInRupees(body.price),
        barcode: body.barcode || "0000000000",
        inventory_quantity: body.quantity || 100,
        compare_at_price: getPriceInRupees(body.compare_at_price),
      },
    ],
    images: [
      {
        src: body.image_src || getRandomUnsplashImage(),
        position: 1,
      },
    ],
  }
}

function getPriceInRupees(price) {
  return "₹" + (price || "0")
}

function getRandomUnsplashImage() {
  return "https://source.unsplash.com/random"
}
