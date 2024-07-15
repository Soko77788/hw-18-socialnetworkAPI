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
    res.json(users)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading users')
  }
})
module.exports = router;
