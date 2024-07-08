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
    'statues' : 'https://img.freepik.com/premium-photo/modern-composition-stylish-accessories-decoration-flowers-gold-monkey-wooden-bench-white-living-room-interior-close-up-detalis_431307-4275.jpg?w=740'
  }
  const name = localStorage.getItem('user');
  const [user, setUser] = useState(name);  
  const {catg} = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchCartDetails = async (id)=>{
      try{
        const response = await fetch('http://localhost:5000/api/users/getlen', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({  id:id }),
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
  
    if(id)
      fetchCartDetails(id);
  })

  const fetchData = async () => {
    try{
      let res = await fetch(`http://localhost:5000/api/users/products/${catg}`);
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
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
            <div className='bag'>
              <Link to='/cart'><img src={bag} alt='bag' id='cart'></img></Link>
              {user && <div className='cart_length'>{cart}</div>}
            </div>
                <img onClick={handleClick} src={user != undefined ? logout : avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
        <img src={banner[catg]} className='central' alt='vs'></img>
        <div className='central-text'>{_.capitalize(catg)}</div>
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
                const {id, name , price, image_url, rating,description} = item;
                const props = {id, name , price, image_url, rating, description};
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
      <Link to='/products/figurines'><li>Figurines</li></Link>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Lighting</div>
      <ul>
        <li>Ceiling Lights</li>
        <li>Table Lamps</li>
        <li>Outdoor Lights</li>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Candles & Scents</div>
      <ul>
        <li>Candles</li>
        <li>Essential Oils</li>
        <li>Diffusers</li>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Art & Wall Decor</div>
      <ul>
        <li>Paintings</li>
        <li>Mirrors</li>
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
  }
  return (
    <div id={props.id} className='product-item' onClick={()=> {viewProduct(props)} }>
      <div className='product-img'>
        <img src={props.props.image_url}></img>
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
        <div className='add-to-cart'><button type='submit' onClick={handleCart} className='cart-button'>Add to Cart</button></div>
        <div className='buy-now'><button onClick={handleCart} type='submit' className='now-buy'>Buy Now</button></div>
      </div>
    </div>
  )
}