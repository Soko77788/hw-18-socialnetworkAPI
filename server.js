const express = require('express');
const mongooseConnection = require('./config/connection')
const routes = require('./routes')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(routes)

app.use(express.urlencoded({ extended: true }));

mongooseConnection.once('connected', () => {
  console.log('Mongoose connected!')

  app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`))
})

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
//   useFindAndModify: false,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

// mongoose.set('debug', true);

// // Define routes
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/thoughts', require('./routes/thoughtRoutes'));

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
