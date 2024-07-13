const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Cart = require('../models/Cart');
const Fav = require('../models/Fav');
const Order = require('../models/Order');
const router = express.Router();
const sofa = require('./sofa')
const chair = require('./chair')
const table = require('./table')
const bed = require('./bed')
const shelf = require('./shelf')
const vase = require('./vase')
const clock = require('./clock')
const fig = require('./fig')
const lights1 = require('./lights1')
const lights2 = require('./lights2')
const lights3 = require('./lights3')
const diff = require('./diff')
const candles = require('./candles')
const mirror = require('./mirror')
const paint = require('./paint')
const oils = require('./oils')

router.get('/products/sofa',(req,res)=>{
    res.send('Hello');
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
router.get('/products/lights1',(req,res)=>{
    res.json(lights1);
})

router.get('/products/lights2',(req,res)=>{
    res.json(lights2);
})

router.get('/products/lights3',(req,res)=>{
    res.json(lights3);
})

router.get('/products/diffuser',(req,res)=>{
    res.json(diff);
})

router.get('/products/candle',(req,res)=>{
    res.json(candles);
})

router.get('/products/mirror',(req,res)=>{
    res.json(mirror);
})

router.get('/products/art',(req,res)=>{
    res.json(paint);
})

router.get('/products/oils',(req,res)=>{
    res.json(oils);
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
    const {userid , name, price, image_url, quantity, brand} = req.body;
    if(await Cart.findOne({userid})){
        const item = await Cart.findOne({userid});
        const selected = item.cart.find((element)=>element.name === name)
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
            item.cart.push({userid, name, price, image_url,quantity:quantity,brand});
            res.status(200).json({message: 'Item Added to Cart'});
        }
        await item.save();
    }
    else{
        const cart = [{userid, name, price, image_url, quantity: quantity,brand}]
        const newCart = new Cart({userid, cart});
        await newCart.save();
        res.status(200).json({message: 'Item Added to Cart'});
    }
})

router.post('/addtofav',async (req, res)=>{
    const {userid , name, price, image_url, catg, product_id,brand} = req.body;
    if(await Fav.findOne({userid})){
        const item = await Fav.findOne({userid});
        const selected = item.fav.find((element)=>element.name === name)
        if(selected)
        {
            item.fav = item.fav.filter((i)=> i.name !== name)
            res.status(200).json({message:'Item Removed from Favorites'});
        }
        else{
            item.fav.push({userid, name, price, image_url, product_id, catg,brand});
            res.status(200).json({message: 'Item Added to Favorites'});
        }
        await item.save();
    }
    else{
        const fav = [{userid, name, price, image_url,product_id, catg,brand}]
        const newFav = new Fav({userid, fav});
        await newFav.save();
        res.status(200).json({message: 'Item Added to Favorites'});
    }
})

router.post('/checkfav',async(req,res)=>{
    const {userid, name} = req.body;
    const item = await Fav.findOne({userid});
    if(item){
        const resp = item.fav.find((i)=> i.name === name);
        if(resp)
            res.status(200).json({fav:'true'});
        else{
            res.status(200).json({fav:'false'});
        }
    }
    else{
        res.status(200).json({fav:'no favorites'});
    }
})

router.post('/getfav', async (req,res)=>{
    const {userid} = req.body;
    const item = await Fav.findOne({userid});
    if(item)
    {
        res.status(200).json({fav:item.fav});
    }
    else{
        res.status(400).json({message:'Failed to get Cart details'});
    }
})

router.post('/rmvfav', async (req,res)=>{
    const {userid, name} = req.body;
    const item = await Fav.findOne({userid});
    if(item)
    {
        item.fav = item.fav.filter((i)=> i.name !== name)
        res.status(200).json({message:'Item Removed from Favorites'});
    }
    else{
        res.status(400).json({message:'Failed to get Cart details'});
    }
    await item.save()
})

router.post('/getlen', async (req, res)=>{
    const {userid} = req.body;
    const item = await Cart.findOne({userid:userid});
    if(item)
    {
        const length = (item.cart).length;
        res.status(200).json({length:length});
    }
    else{
        res.status(200).json({length:0});
    }
})

router.post('/getcart', async (req,res)=>{
    const {userid} = req.body;
    const item = await Cart.findOne({userid});
    if(item)
    {
        res.status(200).json({cart:item.cart});
    }
    else{
        res.status(400).json({message:'Failed to get Cart details'});
    }
})

router.post('/inc',async (req, res)=>{
    const {userid , name} = req.body;
    const item = await Cart.findOne({userid});
    if(item){
        const selected = item.cart.find((element)=>element.name === name.name)
        console.log(selected);
        if(selected)
        {
            if(selected.quantity == 6)
            {
                res.status(200).json({message: 'limit'})
            }
            else{
            selected.quantity += 1;
            res.status(200).json({message:'increased'});
        }
        }
        await item.save();
    }
})

router.post('/dec',async (req, res)=>{
    const {userid , name} = req.body;
    const item = await Cart.findOne({userid});
    if(item){
        const selected = item.cart.find((element)=>element.name === name.name)
        if(selected)
        {
            if(selected.quantity == 1)
            {
                res.status(200).json({message: 'remove'})
                item.cart = item.cart.filter((i)=> i.name !== name.name);
            }
            else{
            selected.quantity -= 1;
            res.status(200).json({message:'increased'});
        }
        }
        await item.save();
    }
})

router.post('/crtorder',async (req,res)=>{
    const {order, userid} = req.body;
    const {name, add, state, city, zip, pay,date, cost} = order;
    const item = await Order.findOne({userid});
    try{
        if(item){
            item.order.push({username:name, state:state, city:city, zip:zip, pay:pay ,date:date, cost:cost});
            await item.save();
            res.status(200).json({message: 'success'});
        }
        else{
            const order = [{username:name, state:state, city:city, zip:zip, pay:pay,date:date, cost:cost}]
            const newOrder = new Order({userid, order});
            await newOrder.save();
            res.status(200).json({message: 'success'});
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(200).json({message: 'failed'});
    }
})

router.post('/clrcart', async (req,res)=>{
    const {userid} = req.body;
    const item = await Cart.findOne({userid});
    if(item){
        item.cart = [];
        res.status(200).json({message:'Cart Cleared'});
    }
    await item.save();
})


router.post('/getorders', async (req,res)=>{
    const {userid} = req.body;
    const item = await Order.findOne({userid});
    if(item)
    {
        res.status(200).json({order:item.order});
    }
    else{
        res.status(400).json({message:'Failed to get Order details'});
    }
})

module.exports = router;
