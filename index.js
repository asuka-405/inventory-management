import cookieParser from "cookie-parser"
import cors from "cors"
import express from "express"
import fileUpload from "express-fileupload"
import fs from "fs"
import mongoose from "mongoose"
import path from "path"
import process from "process"
import authRouter from "./auth/route.js"
import Product from "./db/product.js"

const app = express()

mongoose
  .connect("mongodb://localhost:27017/coral")
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log({ err, message: "Failed to connect to MongoDB" })
  })

// Enable JSON parsing for all routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const publicFiles = express.static(path.join(process.cwd(), "public"))
app.use("/public", publicFiles)
app.use("/", publicFiles)
app.use("/auth", authRouter)

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
  })
)

app.post("/publish", fileUpload(), async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.price) {
    res.status(400).send("No content provided")
    return
  }

  await Product.create(req.body).catch((err) => {
    console.log(err)
    res.status(500).send("Failed to publish product")
  })
  res.send("Product published successfully")
})

app.use((err, req, res, next) => {
  if (!fs.existsSync("./logs/err.log")) {
    if (!fs.existsSync("./logs")) fs.mkdirSync("./logs")
    fs.writeFileSync("./logs/err.log", "")
  }

  const error = `
    //////////////////////////////////////////////////
    time: ${new Date().toISOString()}
    message: ${err.message},
    stack: ${err.stack},
    //////////////////////////////////////////////////
    \n\n
  `

  fs.appendFileSync("./logs/err.log", `${error}\n`)
  res.status(500).send(error)
})

app.all("*", (req, res) => {
  res.status(404).send("Page not found")
})

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
