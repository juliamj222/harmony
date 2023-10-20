const jwt = require("jsonwebtoken")
const Room = require("../models/room.model")

const getRoom = async  (req, res, next) => {
    try {

    const room = await Room.findById(req.params.id);

    if(!room) {
        throw new Error("room not found");
    }
    req.room = room;

    return next();
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

module.exports = getRoom;