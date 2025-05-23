const express = require('express');
const User = require('../models/User');
const auth = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Harryisagoodboy';

//Route 1: Create a user using POST "/api/auth/createuser". No login required
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

//Route 2: Authenticate a user using POST "/api/auth/login". No login required
auth.post('/login', [
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
],  async (req, res)=> {

  //If there are errors, return Bad request and the errrors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try{
    let user = await User.findOne({ email });
    if(!user){
      return res.status(400).json({ error: "Please try to login with correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({ error: "Please try to login with correct credentials" }) ;
    }

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
//Route 3: Get loggedin user details using POST "/api/auth/getuser". Login required
auth.post('/getuser',fetchuser,  async (req, res)=> {
try {
  userId = req.user.id ;
  const user = await User.findById(userId).select("-password");
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
})

module.exports = auth
