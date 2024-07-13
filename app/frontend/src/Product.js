import React from 'react'
import './products-page.css';
import bag from './bag.png'
import avatar from './avatar.png'
import logout from './logout.png'
import vs from './vs-banner.jpg'
import star from './star.png'
import load from './loading.gif'
import { useState, useEffect } from 'react';
import Footer from './Footer'
import {useParams,Link,useNavigate} from 'react-router-dom'
import tbl from './tbl.png'
import toast, { Toaster } from 'react-hot-toast';
import Modal from './Modal';
import favob from './favob.png'
import empty from './empty_box.png'
import box from './box.png'
import favo from './favo.png'
import {motion} from 'framer-motion'
const _ = require('lodash');
let copy;

export default function Product() {
  const id = localStorage.getItem('userid');
  const [isModal, setModal] = useState(false);
  const [product, setProduct] = useState('');
  const [cart, setCart] = useState(undefined);
  const banner = {
    'sofa':'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'table':  tbl,
    'chair': 'https://img.freepik.com/free-photo/blue-white-chair_1203-2058.jpg?t=st=1720206598~exp=1720210198~hmac=652840d4c07df13c821f64ec915b4196e17d40cb05b49002df59c7d175e9a45f&w=740',
    'bed' : 'https://img.freepik.com/free-photo/color-year-interior-design-space-with-furniture-decor_23-2151397387.jpg?t=st=1720206801~exp=1720210401~hmac=b39e232b5909e13abd23d36b013d7b4949722fabe534ba17eb3ef89806bfbd43&w=826',
    'shelf' : 'https://img.freepik.com/free-photo/wooden-plant-shelf-against-blank-wall_53876-110326.jpg?t=st=1720206995~exp=1720210595~hmac=696c815c4a060c2706ba9e2158d0e8e4ca2ae3138f9034e8345c738683d2a12b&w=740',
    'vase':vs,
    'clock':'https://images.unsplash.com/photo-1527434284315-fadc3143d9f2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'statues' : 'https://img.freepik.com/premium-photo/modern-composition-stylish-accessories-decoration-flowers-gold-monkey-wooden-bench-white-living-room-interior-close-up-detalis_431307-4275.jpg?w=740',
    'lights1' : 'https://img.freepik.com/premium-photo/vintage-ceiling-cage-lighting_62754-823.jpg?w=826',
    'lights2' : 'https://img.freepik.com/premium-photo/vintage-ceiling-cage-lighting_62754-823.jpg?w=826',
    'lights3' : 'https://img.freepik.com/premium-photo/vintage-ceiling-cage-lighting_62754-823.jpg?w=826',
    'diffuser' : 'https://img.freepik.com/premium-photo/cozy-home-decor-with-candles-plants_161362-19175.jpg?w=740',
    'candle' : 'https://img.freepik.com/free-photo/glowing-candle-illuminates-dark-room-with-tranquility-generated-by-ai_188544-18327.jpg?t=st=1720731050~exp=1720734650~hmac=bf1eb8c903c80c73dc9c244aadeec6a5a9bc02d51179a83871b8ba8e40628e31&w=826',
    'mirror':'https://img.freepik.com/premium-photo/close-up-desk-with-mirror-other-decorations_305343-1051.jpg?w=740',
    'art' : 'https://img.freepik.com/free-photo/modern-styled-entryway_23-2150695917.jpg?t=st=1720731000~exp=1720734600~hmac=913e7fe930e084f803be8113c4803eb6cca6f7d30ffa77420c910b50b7d738d8&w=740',
    'oils' : 'https://img.freepik.com/free-photo/front-view-eco-friendly-cleaning-products-set-with-soap-cotton-swabs_23-2148818490.jpg?t=st=1720729617~exp=1720733217~hmac=17dc7a34198d8b6ee61b2b4f48571264ade60245f31a99a9624cf663ec256c0f&w=740',

  }
  const name = localStorage.getItem('user');
  const [user, setUser] = useState(name);  
  const {catg} = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fav, setFav] = useState(0);

  useEffect(()=>{
    const fetchFavData = async (id) => {
      try {
          const response = await fetch('http://localhost:5000/api/users/getfav', {
              method : 'POST',
              headers: {
                'Content-type' : 'application/json',
              },
              body: JSON.stringify({userid : id}),
            });
          const data = await response.json();
          if (response.ok) {
              setFav(data.fav.length);
              
          } else {
              console.log(data.message);
          }
      } catch (err) {
          console.log(err);
      }
    }
    const fetchCartDetails = async (userid)=>{
      try{
        const response = await fetch('http://localhost:5000/api/users/getlen', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({  userid:userid }),
      });
      const data = await response.json();
      if(response.ok){
        setCart(data.length)
      }
      else{
        console.log('err');
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }
  
    if(id){
      fetchCartDetails(id);
      fetchFavData(id);
    }
})


  const fetchData = async () => {
    try{
      let res = await fetch(`https://e-commerce-frontend-app-seven.vercel.app/products/${catg}`);
      res = await res.json();
      copy = res.data;
      setData(res.data);
      setLoading(false);
    }
    catch(err){
      throw(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[catg]);



  if (loading){
    return(
    <div className='loading'><img src={load} alt='animation'></img></div> )
  }

  const handleClick = (e)=>{
    e.preventDefault();
    if(user != null){
      localStorage.clear();
      toast.success('Logged Out!')
      localStorage.setItem('greeted','no')   
      navigate('/');
      setUser(undefined);
    }
    else{
      navigate('/login');
    }
  }
   
  return (
    <>
    <Toaster/>
    {isModal && <Modal props={product} modal={isModal} setmodal={setModal}/>}
    <div className='container'>
        <div className='navbar1'>
            <div className='logo'>Oak & Ivory</div>
            <div className='tabs'>
                <Link to='/'><div className='home'>Home</div></Link>
                <Link to='/products/sofa' ><div className='collect'>Collections</div></Link>
                <Link to='/products/about'><div className='abt'>About</div></Link>
            </div>
            <div className='icons'>
            <div><Link to='/orders'><img src={box} alt='bag' id='box'></img></Link></div>
            <div><Link to='/favorites'><img src={(user && fav > 0) ? favo : favob} alt='bag' id='cart'></img></Link></div>
            <div className='bag'>
              <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
                <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
        <img src={banner[catg]} className='central' alt='vs'></img>
        <div className='central-text'>{catg.includes('lights') ? 'Lights' : _.capitalize(catg)}</div>
    </div>
    <div className='catalog'>
        <div className='outer-grid'>
          <div className='search-section'>
            <div className='tagline'>Curate Your Perfect Home</div>
            <div className='search-bar'>
              <div>
              <form  className='form1'>
                  <input type='text' className='input' value='Find your creativity ...'></input>
                  <button type='button' className='search'>Search</button>
              </form>
            </div>
            </div>
          </div>
          <div className='filter'>
            <div className='category-text'>
              Category
            </div>
            <CategoryList />
          </div>
          <div className='result-section'>
            {
              data.map((item) => {
                const {id, name , price, image_url, rating,description,brand} = item;
                const props = {id, name , price, image_url, rating, description, catg,brand};
                return (
                  <Item props = {props} id={id} modal={isModal} setmodal={setModal} setproduct={setProduct}></Item>
                )
              })
            }
          </div>
        </div>
    </div>
    <Footer />
  </>
  )
}


const CategoryList = ()=>{
  return(
    <>
    <div className='category-field'>
      <div className='category-name'>Furniture</div>
      <ul>
        <Link to='/products/sofa'><li >Sofa & Couches</li></Link>
        <Link to='/products/table'><li>Tables</li></Link>
        <Link to='/products/chair'><li>Chairs</li></Link>
        <Link to='/products/bed'><li>Beds</li></Link>
        <Link to='/products/shelf'><li>Bookshelves</li></Link>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Decor</div>
      <ul>
      <Link to='/products/vase'><li>Vases</li></Link>
      <Link to='/products/clock'><li>Clocks</li></Link>
      <Link to='/products/statues'><li>Figurines</li></Link>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Lighting</div>
      <ul>
      <Link to='/products/lights1'><li>Ceiling Lights</li></Link>
      <Link to='/products/lights2'><li>Table Lamps</li></Link>
      <Link to='/products/lights3'><li>Outdoor Lights</li></Link>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Candles & Scents</div>
      <ul>
      <Link to='/products/candle'><li>Candles</li></Link>
      <Link to='/products/oils'><li>Essential Oils & Fragnance</li></Link>
      <Link to='/products/diffuser'><li>Diffusers</li></Link>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Art & Wall Decor</div>
      <ul>
      <Link to='/products/art'><li>Paintings</li></Link>
      <Link to='/products/mirror'><li>Mirrors</li></Link>
      </ul>
    </div>
    </>
  )
}

const Item = (props) =>{
  
  const handleCart = ()=>{
    const name = localStorage.getItem('user');
    const userid = localStorage.getItem('userid');
    if(!name)
    {
      toast('Please Login to Continue!', {
        icon: '⛔',
      });
    }
  }
  const viewProduct = (props)=>{
    props.setmodal(true);
    props.setproduct(props)
    console.log(props)
  }
  return (
    <div id={props.id} className='product-item' onClick={()=> {viewProduct(props)} }>
      <div className='product-img'>
        <motion.img whileHover={{scale:1.04}} src={props.props.image_url}></motion.img>
      </div>
      <div className='product-name'>{props.props.name}</div>
      <div className='review-price'>
        <div className='review'>
          <img src={star}></img>
          <div className='rating'>{props.props.rating}</div>
        </div>
          <div className='pricce'>₹{props.props.price}</div>
      </div>
      <div className='buttons'>
        <div className='add-to-cart'><motion.button whileHover={{scale:1.03}} whileTap={{scale:0.95}} type='submit' onClick={handleCart} className='cart-button'>Add to Cart</motion.button></div>
        <div className='buy-now'><motion.button whileHover={{scale:1.03}} whileTap={{scale:0.95}} onClick={handleCart} type='submit' className='now-buy'>Buy Now</motion.button></div>
      </div>
    </div>
  )
}