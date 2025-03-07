require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/cours'); 

const app = express();
app.use(express.json());
 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connecté pour Course-Service'))
    .catch(err => console.log(err));

    app.use('/courses', courseRoutes);
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    
module.exports = mongoose;