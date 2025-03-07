const mongoose = require('../index');
const StudentSchema = new mongoose.Schema({
    id: String,
    nom: String,
    email: String,
    cours: [String]
});
module.exports = mongoose.model('etudiant', StudentSchema);