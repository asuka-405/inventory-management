import bcrypt from "bcrypt"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
})

// Pre-save hook to hash the password before saving the user
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("hashedPassword")) {
      return next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.hashedPassword, salt)
    this.hashedPassword = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.hashedPassword)
    return isMatch
  } catch (error) {
    next(error)
  }
}

const User = mongoose.model("User", userSchema)

export default User
