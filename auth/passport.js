import LocalStrategy from "passport-local"
import { getUserByUsername } from "../db/utils.js"

export default function initializeAuthentication(passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username", passwordField: "password" },
      authenticateUser
    )
  )
}

async function authenticateUser(username, password, done) {
  const user = await getUserByUsername(username)
  if (!user) return done(null, false, { message: "User Not Found!" })
  if (!user.comparePassword(password))
    return done(null, false, { message: "Password Incorrect!" })
  return done(null, user)
}
