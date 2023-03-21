const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);


const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;


mongoose.connect(MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`MongoDB Connected`);
    })
    .catch((err) => {
        console.log(`Error in DB connection: ${err}`);
    });

