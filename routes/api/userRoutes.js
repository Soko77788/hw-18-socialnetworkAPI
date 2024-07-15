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


module.exports = router;
