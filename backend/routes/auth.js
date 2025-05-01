const express = require('express');
const router = express.Router();

router.get('/',(req, res)=> {
    obj = {
        a: 'thios',
        number: 34 , 
        b: 'name'
    }
    res.json(obj)
})

module.exports = router