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


