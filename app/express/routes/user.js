const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const sofa = require('./sofa')
const chair = require('./chair')
const table = require('./table')
const bed = require('./bed')
const shelf = require('./shelf')
const vase = require('./vase')
const clock = require('./clock')
const fig = require('./fig')

router.get('/products/sofa',(req,res)=>{
    res.json(sofa);
})
router.get('/products/chair',(req,res)=>{
    res.json(chair);
})
router.get('/products/bed',(req,res)=>{
    res.json(bed);
})
router.get('/products/shelf',(req,res)=>{
    res.json(shelf);
})
router.get('/products/table',(req,res)=>{
    res.json(table);
})
router.get('/products/vase',(req,res)=>{
    res.json(vase);
})
router.get('/products/clock',(req,res)=>{
    res.json(clock);
})
router.get('/products/figurines',(req,res)=>{
    res.json(fig);
})

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(user)
        {
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.error });
    }
});


router.post('/login', async (req, res) => {
    const {  email, password } = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        res.status(200).json({ message: 'Logged In', username:user.name});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
