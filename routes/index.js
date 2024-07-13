const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const router = require('express').Router();

// Mount routes
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;
