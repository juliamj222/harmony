const mongoose = require("mongoose");
// the characteristics that every user will have
const UserSchema=new mongoose.Schema({
    firstName: {
        type: String,
      },
    lastName: {
        type: String,
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
    isAdmin: {
        type: Boolean,
        defaultValue: false,
    }
})

module.exports = mongoose.model("User", UserSchema);