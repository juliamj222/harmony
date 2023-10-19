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
  }
  });

module.exports = mongoose.model("Room", RoomSchema);