const router = require("express").Router();
const getRoom = require("../middleware/get-room");
const Room = require("../models/room.model");
const validateSession = require("../middleware/validate-session");

//- [ ] Create endpoint - user automatically becomes the addedUser, we can add more addedUsers with the array function
router.post("/add", validateSession, async (req, res) => {
  try {
    const { name, description, addedUsers, removeAddedUsers, userId } = req.body;
    const room = new Room({
      name: name,
      description: description,
      removeAddedUsers: false,
      addedUsers: req.user._id,
      userId: req.user._id,
    });
    const newRoom = await room.save();
    res.json({
      message: "success from add",
      room: newRoom,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//- [ ] Display all rooms endpoint
router.get("/view-all", validateSession, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ message: "these are all the rooms", rooms: rooms });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//- [ ] Add `update` and `delete` endpoints to your `rooms` controller

// delete
router.delete("/delete/:id", validateSession, async (req, res) => {
    try {
      const id = req.params.id;
      const conditions={
        _id: id,
        userId: req.user._id,
      } 
      if(req.user.isAdmin) {
      const room = await Room.deleteOne({ _id: id });
      res.json({
        message:
          room.deletedCount === 1
            ? "the room was deleted"
            : "failure to delete the room",
      })}
      else {
        const room = await Room.deleteOne(conditions);
        res.json({
          message:
            room.deletedCount === 1
              ? "the room was deleted"
              : "failure to delete the room",
        })
      } 
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });

// update function. we can add addedUsers in this function too, pushing them into the array

router.patch("/update/:id", validateSession, getRoom, async function (req, res) {
  try {
    const id = req.params.id;
    const conditions = { _id: id, userId: req.user._id };
    const currentUser = req.room.addedUsers;
    let {addedUsers, name, description, removeAddedUsers}=req.body;
    if(req.user.isAdmin) {
      if (removeAddedUsers) {
        addedUsers=currentUser.filter(user => !addedUsers.includes(user))
      } 
      else {
        currentUser.push(addedUsers);
        addedUsers=currentUser; 
      }
    const options = { new: true };
    const data= {name, description, addedUsers}
    const room = await Room.findOneAndUpdate({_id:id}, data, options);
    if (!room) {
      throw new Error("Room was not found");
    }
    res.json({
      message: "success from update",
      room: room,
    })}
    else {
      if (removeAddedUsers) {
        addedUsers=currentUser.filter(user => !addedUsers.includes(user))
      } 
      else {
        currentUser.push(addedUsers);
        addedUsers=currentUser; 
      }
    const options = { new: true };
    const data= {name, description, addedUsers}
    const room = await Room.findOneAndUpdate(conditions, data, options);
    if (!room) {
      throw new Error("Room was not found");
    }
    res.json({
      message: "success from update",
      room: room,
    })} 
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;


