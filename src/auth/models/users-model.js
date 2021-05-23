'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

const mongoose = require('mongoose');



//////////////////////////
////// Schema       /////
////////////////////////

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Users = mongoose.model('users', usersSchema);





module.exports = Users;
