const router = require('express').Router();
const { User, Thought } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating User')
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await User
      .find(req.query)
      .populate('thoughts')
    res.json(users)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading users')
  }
})

router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User
      .findById(_id)
      .populate('thoughts')

    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error finding user: ${_id}`)
  }
})

router.put('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true })
    res.json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error updating user: ${_id}`)
  }
})

router.delete('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const user = await User.findByIdAndDelete(_id)
    const userId = user._id

    // find all products with the delete deptId
    const thoughts = await Thought.find({
      user: userId
    })

    for (const thought of thoughts) {
      // remove product.department field
      await Thought.findByIdAndUpdate(thought._id, {
        $unset: { user: 1 }
      })
    }

    res.json({ message: 'User deleted successfully', deletedUser: user })
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error deleting department: ${_id}`)
  }
})


module.exports = router;
