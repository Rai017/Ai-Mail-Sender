const mongoose=require("mongoose");
const emailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: String,
  originalMessage: String,
  formattedMessage: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);