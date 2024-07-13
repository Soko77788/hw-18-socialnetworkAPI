const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// GET a single thought by ID
router.get('/:thoughtId', getThoughtById);

// POST create a new thought
router.post('/', createThought);

// PUT update a thought by ID
router.put('/:thoughtId', updateThought);

// DELETE remove a thought by ID
router.delete('/:thoughtId', deleteThought);

// POST create a reaction to a thought
router.post('/:thoughtId/reactions', createReaction);

// DELETE remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
