const connectToMongo = require('./db');
const express = require('express');
const auth = require('./routes/auth')

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json())

//Available Routes
app.use('/api/auth', auth)
app.use('/api/notes', require('./routes/notes'))
   
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

