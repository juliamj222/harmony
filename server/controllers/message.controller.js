/* 
    ? ENDPOINTS
    * View all with room
    * Create within room
    * Update within room
    * Delete wihtin room
*/

const router = require("express").Router();
const Message = require("../models/message.model");
// const validateSession = require("../middleware/validate-session.js");

router.get("/view-all/:id", async (req, res) => {
    try {
        const messages = await Message.find({room: req.params.id});
        res.json({message: "view all complete", messages: messages});
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.post("/create", async (req, res) => {
    try {
        const currentDate = new Date();
        const {body, room} = req.body
        const message = new Message({
            when: currentDate,
            // user: req.user._id,
            room,
            body,
        })

        const newMessage = await message.save();
        res.json({message: "Message Created Successfully", body: newMessage,})
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.patch("/update/:id", async (req, res) => {
    try {
        // add ownerId: req.user._id
        const conditions = {_id: req.params.id,};
        const data = req.body;
        const options = {new: true};

        const message = await Message.findOneAndUpdate(conditions, data, options);
        if (!message){
            throw new Error("Message Could not be updated or not found");
        }
        res.json({message: "Message Updated Successfully", Message: message})
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        // add ownerId: req.user._id
        const conditions = {_id: req.params.id,};
        const message = await Message.deleteOne(conditions);
        res.json({message: message.deletedCount == 1 ? "Message Deleted Successfully" : "Failure to Delete Message"});
    } catch (error) {
        res.status(500).json({message: error.Message});
    }
});


module.exports = router;