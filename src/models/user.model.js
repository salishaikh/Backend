import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    todotasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    doingtasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    donetasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
