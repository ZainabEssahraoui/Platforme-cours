const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Student = require('../models/etudiant');
const COURSE_SERVICE_URL = 'http://localhost:5001/courses';

// q12-a
router.get('/all', verifyToken, (req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(500).json({ message: err.message }));
});

// q12-b
router.post('/add', verifyToken, (req, res) => {
    const student = new Student(req.body);
    student.save()
        .then(() => res.status(201).json({ message: 'etudiant ajoute avec succes' }))
        .catch(err => res.status(400).json({ message: err.message }));
});

// q12-c
router.post('/enroll/:etudiant_id/:cours_id', verifyToken, (req, res) => {
    axios.get(`${COURSE_SERVICE_URL}/all`)
        .then(response => {
            const courseExists = response.data.some(course => course._id === req.params.cours_id);
            if (!courseExists) return res.status(400).json({ message: 'Cours non disponible' });

            return Student.findByIdAndUpdate(req.params.etudiant_id, { $addToSet: { cours: req.params.cours_id } });
        })
        .then(() => res.json({ message: 'etudiant inscrit au cours' }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// q12-d
router.get('/enrolledCourses/:etudiant_id', verifyToken, (req, res) => {
    Student.findById(req.params.etudiant_id)
        .populate('cours')
        .then(student => {
            if (!student) return res.status(404).json({ message: 'etudiant non trouvé' });
            res.json(student.cours);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
