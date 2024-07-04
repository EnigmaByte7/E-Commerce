const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


router.post('/register', async (req, res) => {
    const {  email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status()
        }
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
