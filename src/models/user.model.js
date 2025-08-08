import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    refreshtoken:{type:String}
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 12);
    }
    next();
  } catch (error) {
    console.log(error);
  }
});
userSchema.method("isPasswordCorrect", async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
  }
});

userSchema.method("generaterefreshtoken", async function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log(error);
  }
});
userSchema.method("generateaccesstoken", async function () {
  try {
    return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
  } catch (error) {
    console.log(error);
  }
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
