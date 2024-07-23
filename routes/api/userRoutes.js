const router = require("express").Router();
const { User, Thought } = require("../../models");

// Create a user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating User");
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(req.query).populate("thoughts");
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error reading users");
  }
});

// Get user by id
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id).populate("thoughts");

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error finding user: ${_id}`);
  }
});

// Update user by id
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error updating user: ${_id}`);
  }
});

// Delete user by id
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findByIdAndDelete(_id);
    const userId = user._id;

    //  BONUS find all thoughts with the delete userId
    const thoughts = await Thought.find({
      user: userId,
    });

    for (const thought of thoughts) {
      // remove thought.user field
      await Thought.findByIdAndUpdate(thought._id, {
        $unset: { user: 1 },
      });
    }

    res.json({ message: "User deleted successfully", deletedUser: user });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting department: ${_id}`);
  }
});

// POST route to add a friend to a user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  // Find the user by userId and update the friends array to add friendId
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    );

    // Return updated user object
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding friend to user");
  }
});

// Delete friend by friendId
router.delete("/:userId/friends/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }
    res.json({ message: "Friend removed successfully", updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing friend from user");
  }
});

module.exports = router;
