import bcrypt from "bcryptjs";
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

// checking if the password match
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//when user creates password for the first time, the password gets modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash the password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
