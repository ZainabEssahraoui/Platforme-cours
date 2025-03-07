const mongoose = require('../index');
const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String
});
module.exports = mongoose.model('utilisateur', UserSchema);