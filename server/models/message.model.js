const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    when: {
        type: String,
    },
    user: {
        type: String,
    },
    room: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        reqiure: true,
    },
    ownerId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Message", MessageSchema)