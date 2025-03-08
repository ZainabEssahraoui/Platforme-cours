const express = require('express');
const router = express.Router();
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');
const Teacher = require('../models/Professeur');

const COURSE_SERVICE_URL = 'http://localhost:5001/courses'; 
const STUDENT_SERVICE_URL = 'http://localhost:5002/students'; 

// q14-a
router.get('/all', verifyToken, (req, res) => {
    Teacher.find()
        .then(teachers => res.json(teachers))
        .catch(err => res.status(500).json({ message: err.message }));
});

// q14-b
router.post('/add', verifyToken, (req, res) => {
    const teacher = new Teacher(req.body);
    teacher.save()
        .then(() => res.status(201).json({ message: 'professeur ajoute avec succes' }))
        .catch(err => res.status(400).json({ message: err.message }));
});

// q14-c
router.post('/assign/:professeur_id/:cours_id', verifyToken, (req, res) => {
    axios.get(`${COURSE_SERVICE_URL}/all`)
        .then(response => {
            const courseExists = response.data.some(course => course._id === req.params.cours_id);
            if (!courseExists) return res.status(400).json({ message: 'cours non disponible' });

            return Teacher.findByIdAndUpdate(req.params.professeur_id, { $addToSet: { cours: req.params.cours_id } });
        })
        .then(() => res.json({ message: 'Cours assigne au professeur' }))
        .catch(err => res.status(500).json({ message: err.message }));
});

// q14-d
router.get('/enrolledStudents/:cours_id', verifyToken, (req, res) => {
    axios.get(`${STUDENT_SERVICE_URL}/enrolledStudents/${req.params.cours_id}`)
        .then(response => res.json(response.data))
        .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
