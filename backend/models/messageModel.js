import mongoose from "mongoose";
const { Schema } = mongoose;

// define the message schema
const messageSchema = new Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    // The chat this message belongs to where the message is sent. Receiver is not needed
    // because the chat already contains the users involved in the chat.
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
