const router = require("express").Router();
const Room = require("../models/room.model");
const validateSession = require("../middleware/validate-session");

//- [ ] Create endpoint
router.post("/add", validateSession, async (req, res) => {
  try {
    console.log(req.user);
    const { name, description, addedUsers } = req.body;
    const room = new Room({
      name: name,
      description: description,
      addedUsers: addedUsers,
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
        ownerId: req.user._id,
      }
      const room = await Room.deleteOne({ _id: id });
      console.log(room);
      res.json({
        message:
          room.deletedCount === 1
            ? "the room was deleted"
            : "failure to delete the room",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  });


//! update

module.exports = router;


