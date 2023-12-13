import dotenv from "dotenv"
import express from "express"
import fs from "fs"
import jwt from "jsonwebtoken"
import passport from "passport"
import User from "../db/user.js"
import { newMessage } from "../helpers/miniUtils.js"
import initializeAuthentication from "./passport.js"
dotenv.config()
initializeAuthentication(passport)

const authRouter = express.Router()

authRouter.post("/signup", isNotAuthenticated, async (req, res, next) => {
  try {
    fs.writeFileSync("./req.json", JSON.stringify(req))
    const { email, password, username } = req.body
    const user = await User.create({
      username,
      email,
      hashedPassword: password,
    })
    res.status(201).json(newMessage(0, "signup_success", null))
  } catch (error) {
    next(error)
  }
})

authRouter.post("/login", isAuthenticated, function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json(newMessage(1, "login_failure", err))

    req.login(user, { session: false }, (err) => {
      if (err) res.status(400).json(newMessage(1, "login_failure", err))
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET)
      res.cookie("token", token, { httpOnly: true })
      res.cookie("user", user)
      res.status(200).json(newMessage(0, "login_success", null))
    })
  })(req, res)
})

export default authRouter

export function isAuthenticated(req, res, next) {
  const token = req.cookies.token
  if (!token) return res.status(401).json(newMessage(1, "Unauthorized", null))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json(newMessage(1, "Unauthorized", err))
    req.user = user
    next()
  })
}

export function isNotAuthenticated(req, res, next) {
  const token = req.cookies.token
  if (token) return res.status(401).json(newMessage(1, "Unauthorized", null))
  next()
}
