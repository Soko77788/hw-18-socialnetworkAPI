const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../controllers/userController');

// GET all users
router.get('/', getAllUsers);

// GET a single user by ID
router.get('/:id', getUserById);

// POST create a new user
router.post('/', createUser);

// PUT update a user by ID
router.put('/:id', updateUser);

// DELETE remove a user by ID
router.delete('/:id', deleteUser);

// POST add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;
