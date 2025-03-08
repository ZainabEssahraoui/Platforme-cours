const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Course = require('../models/Cours'); 

// Q10-a
router.get('/all', verifyToken,  (req, res) => {
    try {
        const courses =  Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Q10-b
router.post('/add', verifyToken,  (req, res) => {
    try {
        const course = new Course(req.body);
         course.save();
        res.status(201).json({ message: 'cours ajoute avec succes' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Q10-c
router.put('/update/:id', verifyToken,  (req, res) => {
    try {
        const updatedCourse =  Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json({ message: 'cours non trouvé' });
        res.json({ message: 'cours mis à jour avec succes', course: updatedCourse });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// // q10-d
router.delete('/delete/:id', verifyToken,  (req, res) => {
    try {
        const deletedCourse =  Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json({ message: 'cours non trouvé' });
        res.json({ message: 'cours supprimé avec succes' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
