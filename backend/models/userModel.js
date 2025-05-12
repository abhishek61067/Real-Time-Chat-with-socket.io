import mongoose from "mongoose";
const { Schema } = mongoose;
// define the user schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://iconarchive.com/download/i107128/Flat-Design-Icons/Flat-User-Profile-2.ico",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
