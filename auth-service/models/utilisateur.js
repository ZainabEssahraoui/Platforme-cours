const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
});
module.exports = mongoose.model('utilisateur', UserSchema);