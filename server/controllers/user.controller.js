const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");

//- [ ] Create user endpoint
router.post("/register", async (req, res) => {
    try {
      const { firstname, lastname, email, password, isAdmin } = req.body;
      const user = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password, 10),
        isAdmin: isAdmin,
});
      const newUser = await user.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: 7 * 24 * 60 * 60,
      });  
      res.json({
        message: "register endpoint",
        user: newUser,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//- [ ] Login user endpoint 
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error("User does not exist");
      }

      const isPasswordAMatch = await bcrypt.compare(password, user.password);
      if (isPasswordAMatch === false) {
        throw new Error("Passwords do not match");
      }
  
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 7 * 24 * 60 * 60,
      });
      res.json({
        message: "signin endpoint",
        user: user,
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//- [ ] Add `update` and `delete` endpoints to your `users` controller
// delete
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    const id = req.params.id;
    const conditions={
      _id: id,
    }
    if (req.user.isAdmin) {
      const user = await User.deleteOne({_id: id});
    res.json({
      message:
        user.deletedCount === 1
          ? "success user was deleted"
          : "failure to delete user",
    });
    } else {
      const user = await User.deleteOne({_id: req.user._id});
      res.json({
        message:
          user.deletedCount === 1
            ? "success user was deleted"
            : "failure to delete user",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// update

router.patch("/update/:id", validateSession, async function (req, res) {
  try {
    const id = req.params.id;
    if (req.user.isAdmin) {
      const conditions = {_id: id};
      let {password, firstname, lastname, email, isAdmin} = req.body;
      password = bcrypt.hashSync(password, 10)
      const data = {
        password,
        firstname,
        lastname,
        email,
        isAdmin,
      }
      const options = { new: true };
      const user = await User.findOneAndUpdate(conditions, data, options);

      if (!user) {
        throw new Error("User was not found");
      }

      res.json({
        message: "success from update",
        user: user,
      });
    } else {
      const conditions = {_id: req.user._id};
      const data = req.body;
      const options = { new: true };
      const user = await User.findOneAndUpdate(conditions, data, options);
  
      if (!user) {
        throw new Error("User was not found");
      }
  
      res.json({
        message: "success from update",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;
