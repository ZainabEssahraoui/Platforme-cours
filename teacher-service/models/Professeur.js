const mongoose = require('../index');
const TeacherSchema = new mongoose.Schema({
    id: String,
    name: String,
    bio: String,
    cours: [String]
});
module.exports = mongoose.model('Professeur', TeacherSchema);