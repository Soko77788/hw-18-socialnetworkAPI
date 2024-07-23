const router = require("express").Router();
const { User, Thought } = require("../../models");

// Create a thought
router.post("/", async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    console.log("req.body.user:", req.body.user);

    console.log("thought._id:", thought._id);

    await User.findByIdAndUpdate(req.body.user, {
      $addToSet: { thoughts: thought._id },
    });

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error creating Thought");
  }
});

// Get all thoughts
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find(req.query);
    res.json(thoughts);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error reading Thoughts");
  }
});

// Get thought by id
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const thought = await Thought.findById(_id);

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error finding thought: ${_id}`);
  }
});

// Update thought by id
router.put("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error updating thought: ${_id}`);
  }
});

// Delete thought by id
router.delete("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const thought = await Thought.findByIdAndDelete(_id);
    const thoughtId = thought._id;

    res.json({
      message: "Thought deleted successfully",
      deletedThought: thought,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error deleting thought: ${_id}`);
  }
});

// Create reaction to a users thought
router.post("/:thoughtId/reactions", async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).send("Thought not found");
    }

    const reaction = {
      reactionBody,
      username,
      createdAt: new Date(),
    };

    thought.reactions.push(reaction);
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding reaction");
  }
});

// Delete reaction by thoughtID and reactionId
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );
    res.json({ message: "Reaction removed successfully", thought });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting reaction");
  }
});

module.exports = router;
