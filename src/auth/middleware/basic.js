'use strict';

//////////////////////////
////// Dependencies /////
////////////////////////

const base64 = require('base-64');
const bcrypt = require('bcrypt');


//////////////////////////
////// Imports      /////
////////////////////////

const Users = require('../models/users-model.js');


module.exports = async (req,res,next)=>{
  const encoded = req.headers.authorization.split(' ')[1];
  const decoded = base64.decode(encoded);
  const [username, password] = decoded.split(':');

  try {
    const user = await Users.findOne({ username });
    if (user){
      const isValid = await bcrypt.compare(password, user.password);
      if(isValid){
        req.user=user;
        next();
      }else{
        next({message: 'Incorrect Password'});
      }
    }else{
      res.status(403).send('Invalid Username');
    }        
  } catch (error) {
    res.status(403).send(`Error: You can't login`);
  }
};
