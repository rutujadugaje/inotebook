const express = require('express');
const User = require('../models/User');
const auth = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodboy';

//Create a user using POST "/api/auth/createuser". Doesn't require Auth
auth.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3}),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5}),
],  async (req, res)=> {
  //If there are errors, return Bad request and the errrors
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //Check whether the user with this email exists already
  try {

  let user = await User.findOne({ email: req.body.email})
  if(user){
    return res.status(400).json({ error: "Sorry a user with this email already exists"})

  }
  //Hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  user = await User.create({
    name : req.body.name,
    password : securePassword,
    email : req.body.email,
  });
  const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data , JWT_SECRET);
  
  res.json({ authtoken })

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
})

module.exports = auth
