import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const shopifyKey = process.env.SF_ADMIN_API_TOKEN
const shopifyAPIVersion = "2023-07"
const shopifyTLD = `https://${process.env.SF_STORE_NAME}.myshopify.com/admin/api/${shopifyAPIVersion}`

getProduct().then((res) => console.log(res))

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

uploadProduct({
  title: "Sample Product",
  body_html: "<p>This is a sample product description.</p>",
  vendor: "Sample Vendor",
  product_type: "Sample Type",
  tags: "sample, tags, dummy",
  barcode: "123456789",
  variants: [
    {
      price: "₹999",
      sku: "SAMPLE-SKU",
      barcode: "123456789",
      weight: "500", // assuming grams
      weight_unit: "g", // grams
      inventory_quantity: "5",
      inventory_management: "shopify", // assuming Shopify inventory management
      inventory_policy: "deny", // assuming deny inventory policy
      fulfillment_service: "manual", // assuming manual fulfillment service
      requires_shipping: false,
    },
  ],
  images: [
    {
      src: "https://example.com/sample-image.jpg",
      position: 1,
    },
  ],
})
