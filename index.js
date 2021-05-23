'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

require('dotenv').config();
const mongoose = require('mongoose');



//////////////////////////
////// Imports      /////
////////////////////////

const server = require('./src/server.js');


/////////////////////////////////
////// Starting the server /////
///////////////////////////////

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(process.env.PORT || 3000);
  })
  .catch((error) => {
    console.log('Connection Error: ', error.message);
  });