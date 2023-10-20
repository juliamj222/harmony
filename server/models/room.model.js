const mongoose = require("mongoose");
// the characteristics that every room will have
const RoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  addedUsers: {
    type: Array,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  removeAddedUsers: {
    type: Boolean,
    defaultValue: false
  }
  });

module.exports = mongoose.model("Room", RoomSchema);