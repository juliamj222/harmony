const router = require("express").Router();
const Message = require("../models/message.model");
const validateSession = require("../middleware/validate-session.js");
const getRoom = require("../middleware/get-room");

router.get("/view-all/:id", async (req, res) => {
    try {
        const messages = await Message.find({room: req.params.id});
        res.json({message: "view all complete", messages: messages});
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.post("/create/:id", validateSession, getRoom, async (req, res) => {
    try {
        const currentDate = new Date();
        const {body} = req.body
        if (req.user.isAdmin) {
            const message = new Message({
                when: currentDate,
                user: req.user._id,
                room: req.room._id,
                body,
            });
            
            const newMessage = await message.save();
            res.json({message: "Message Created Successfully", body: newMessage,})
        } else {
            if (!req.room.addedUsers.includes(req.user._id)) {
                throw new Error("You can't post messages to this room")
            };
            const message = new Message({
                when: currentDate,
                user: req.user._id,
                room: req.room._id,
                body,
            });
            
            const newMessage = await message.save();
            res.json({message: "Message Created Successfully", body: newMessage,})
        }
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.patch("/update/:id", validateSession, async (req, res) => {
    try {
        if (req.user.isAdmin){
            const conditions = {_id: req.params.id};
            const data = req.body;
            const options = {new: true};
    
            const message = await Message.findOneAndUpdate(conditions, data, options);
            if (!message){
                throw new Error("Message Could not be updated or not found");
            }
            res.json({message: "Message Updated Successfully", Message: message})
        } else {
            const conditions = {_id: req.params.id, user: req.user._id};
            const data = req.body;
            const options = {new: true};
    
            const message = await Message.findOneAndUpdate(conditions, data, options);
            if (!message){
                throw new Error("Message Could not be updated or not found");
            }
            res.json({message: message})
        }
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
        if (req.user.isAdmin){
            const conditions = {_id: req.params.id,};
            const message = await Message.deleteOne(conditions);
            res.json({message: message.deletedCount == 1 ? "Message Deleted Successfully" : "Failure to Delete Message"});
        } else {
            const conditions = {_id: req.params.id, user: req.user._id};
            const message = await Message.deleteOne(conditions);
            res.json({message: message.deletedCount == 1 ? "Message Deleted Successfully" : "Failure to Delete Message"});
        };
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});


module.exports = router;