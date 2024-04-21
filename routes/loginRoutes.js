
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
    try {
        const { email, passord } = req.body;

        // Finn brukeren basert på e-post
        const user = await User.findOne({ email });

        // Sjekk om brukeren eksisterer
        if (!user) {
            console.log('Ugyldige påloggingsopplysninger: Bruker ikke funnet');
            return res.status(401).json({ error: 'Ugyldige påloggingsopplysninger e-post' });
        }

        // Sammenlign det innskrevne passordet med det hasjede passordet i databasen
        const erPassordGyldig = await bcrypt.compare(passord, user.passord);

        if (!erPassordGyldig) {
            console.log('Ugyldige påloggingsopplysninger: Passord stemmer ikke');
            return res.status(401).json({ error: 'Ugyldige påloggingsopplysninger passord' });
        }

        // Hvis passordet er gyldig, generer en token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        // Send tokenet til klienten
        res.status(200).json({ token });
    } catch (error) {
        console.error('Feil ved pålogging:', error);
        res.status(500).json({ error: 'Intern serverfeil', detaljer: error.message, stakk: error.stack });
    }
});

module.exports = router;
