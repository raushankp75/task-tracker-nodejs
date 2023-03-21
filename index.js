const express = require('express');
const cors = require('cors')
const bodyparser = require("body-parser");
const db = require('./db');


const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));



const port = 9000;

app.get('/', (req, res) => {
    res.send({ code: '200', message: 'Welcome to Task Tracker' })
    console.log("ACCESSING ROOT");
})

app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/authRoutes'));
app.use('/api', require('./routes/taskRoutes'));
app.use('/api', require('./routes/commentRoute'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})