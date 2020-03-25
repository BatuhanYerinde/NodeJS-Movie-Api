const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://filmler:batu5206@ds057538.mlab.com:57538/heroku_kjqbrc99', { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, });

  mongoose.connection.on('open', () => {
     //console.log('MongoDB: Connected');
  });
  mongoose.connection.on('error', (err) => {
      console.log('MongoDB Connection Error:',err);
  });
  mongoose.Promise = global.Promise;
};