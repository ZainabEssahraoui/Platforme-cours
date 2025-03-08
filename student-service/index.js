require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const studentRoute = require('./routes/student'); 

const app = express();
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongoDB connecté pour student-service'))
    .catch(err => console.log(err));

    app.use('/student', studentRoute);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
    
module.exports = mongoose;