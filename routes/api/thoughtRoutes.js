const router = require('express').Router();
const { User, Thought } = require('../../models')

router.post('/', async (req, res) => {
  try {
    const thought = await Thought.create(req.body)
    console.log('req.body.user:', req.body.user);

    console.log('thought._id:', thought._id);
    
    await User.findByIdAndUpdate(req.body.user, {
      $addToSet: { thoughts: thought._id }
    })
    
    res.json(thought)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error creating Thought')
  }
})

router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought
      .find(req.query)
    res.json(thoughts)
  } catch(err) {
    console.log(err)
    res.status(500).send('Error reading Thoughts')
  }
})

router.get('/:_id', async (req, res) => {
  const { _id } = req.params
  try {
    const thought = await Thought
      .findById(_id)
      

    res.json(thought)
  } catch(err) {
    console.log(err)
    res.status(500).send(`Error finding thought: ${_id}`)
  }
})


module.exports = router;
