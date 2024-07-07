const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Fav = require('../models/Fav');
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
router.get('/products/statues',(req,res)=>{
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
        res.status(200).json({ message: 'Logged In', username:user.name,id:user._id});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/addtocart',async (req, res)=>{
    const {userid , productid, quantity} = req.body;
    if(await Cart.findOne({userid})){
        const item = await Cart.findOne({userid});
        const selected = item.cart.find((element)=>element.productid === productid)
        if(selected)
        {
            if(selected.quantity == 6)
            {
                res.status(401).json({message: 'Purchase is limited to 6 units per item!'})
            }
            else{
            selected.quantity += quantity;
            res.status(200).json({message: 'Item Added to Cart'});}
        }
        else{
            item.cart.push({productid,quantity:quantity});
            res.status(200).json({message: 'Item Added to Cart'});
        }
        await item.save();
    }
    else{
        const cart = [{productid: productid, quantity: quantity}]
        const newCart = new Cart({userid, cart});
        await newCart.save();
        res.status(200).json({message: 'Cart Created and Item added'});
    }
    console.log('im here')
})

router.post('/getlen', async (req, res)=>{
    const {id} = req.body;
    const item = await Cart.findOne({userid:id});
    console.log(item.cart);
    if(item)
    {
        const length = (item.cart).length;
        res.status(200).json({length:length});
    }
    else{
        res.status(200).json({length:0});
    }
})

module.exports = router;
