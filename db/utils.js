import bwipjs from "bwip-js"
import fs from "fs"

import mongoose from "mongoose"
import path from "path"
import User from "./user.js"

export function connectToDatabase(dbName) {
  mongoose
    .connect(`mongodb://localhost:27017/${dbName}`)
    .then(() => {
      console.log("Connected to MongoDB: ", dbName)
    })
    .catch((err) => {
      console.log({ err, message: "Failed to connect to MongoDB" })
    })
}

export async function getUserByUsername(username) {
  return await User.findOne({ username })
}

export async function getUserById(id) {
  return await User.findById(id)
}

export async function getUserByEmail() {
  return await User.findOne({ email })
}

export async function getBarcode(pid) {
  let barcode
  bwipjs.toBuffer(
    {
      bcid: "code128", // Barcode type
      text: "0123456789", // Text to encode
      scale: 3, // 3x scaling factor
      height: 10, // Bar height, in millimeters
      includetext: true, // Show human-readable text
      textxalign: "center", // Always good to set this
    },
    function (err, png) {
      if (err) {
        throw err
      } else {
        fs.writeFileSync(
          path.join(process.cwd(), `public`, `assets`, `barcode`, `${pid}.png`),
          png
        )
        barcode = png
        // `png` is a Buffer
        // png.length           : PNG file length
        // png.readUInt32BE(16) : PNG image width
        // png.readUInt32BE(20) : PNG image height
      }
    }
  )
  return barcode
}
