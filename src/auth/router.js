'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


//////////////////////////
////// Imports      /////
////////////////////////

const basicAuth = require('./middleware/basic.js');
const Users = require('./models/users-model.js');


//////////////////////////
////// Routes    ////////
////////////////////////

router.post('/signup', signupHandler);
router.post('/signin', basicAuth, signinHandler);


//////////////////////////
////// Handlers  ////////
////////////////////////


async function signupHandler(req,res){

  try {

    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new Users({ username, password: hash });
    const record = await user.save();
    res.status(201).json(record);              
  } catch (error) {
    res.status(403).send('Error : User is not created , please try again');        
  }
}

async function signinHandler(req,res){
  res.status(200).json(req.user);
}


module.exports = router;