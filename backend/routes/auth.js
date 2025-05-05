const express = require('express');
const User = require('../models/User');
const auth = express.Router();


//Create a user using POST "/api/auth". Doesn't require Auth
auth.post('/',async (req, res)=> {
    console.log(req.body);
    const user = await User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = auth
