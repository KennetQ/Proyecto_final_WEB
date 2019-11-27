const mongoose = require('mongoose');

const { database } = require('./keys');

mongoose.connect(database.URI, { //Conexion con mongoose
  useNewUrlParser: true    
})
  .then(db => console.log('db is connected'))
  .catch(err => console.log(err));
