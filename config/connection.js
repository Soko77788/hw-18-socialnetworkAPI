const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork_db')

module.exports = mongoose.connection