const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/utilisateur');
const verifyToken = require('../middleware/verifyToken');


router.post('/register', (req, res) => {
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(req.body.password, salt))
        .then(hashedPassword => {
            const user = new Utilisateur({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            return user.save();
        })
        .then(() => res.status(201).json({ message: 'utilisateur enregistr' }))
        .catch(err => res.status(400).json({ message: err.message }));
});


router.post('/login', (req, res) => {
    Utilisateur.findOne({ email: req.body.email })
        .then(user => {
            if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' });

            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ message: 'Email o mot de passe incorrect' });

                    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.header('Authorization', token).json({ token });
                });
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

router.get('/profile', verifyToken, (req, res) => {
    Utilisateur.findById(req.user.id)
        .select('-password')
        .then(user => {
            if (!user) return res.status(404).json({ message: 'utilisateur non trouve' });
            res.json(user);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

module.exports = router;
