import React from 'react'
import './products-page.css';
import bag from './bag.png'
import avatar from './avatar.png'
import logout from './logout.png'
import vs from './vs-banner.jpg'
import star from './star.png'
import load from './loading.gif'
import chr from './chr.png'
import { useState, useEffect } from 'react';
import Footer from './Footer'
import {useParams,Link,useNavigate} from 'react-router-dom'
import tbl from './tbl.png'
const _ = require('lodash');

export default function Product() {
  const banner = {
    'sofa':'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'table':  tbl,
    'chair': chr
  }
  const name = localStorage.getItem('user');
  const [user, setUser] = useState(name);  
  const {catg} = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try{
      let res = await fetch(`http://localhost:5000/api/users/products/${catg}`);
      res = await res.json();
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
      localStorage.removeItem('user');
      navigate('/');
      setUser(undefined);
    }
    else{
      navigate('/login');
    }
  }
  return (
    <>
    <div className='container'>
        <div className='navbar1'>
            <div className='logo'>Oak & Ivory</div>
            <div className='tabs'>
                <Link to='/'><div className='home'>Home</div></Link>
                <Link to='/products/sofa' ><div className='collect'>Collections</div></Link>
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
                <img src={bag} alt='bag' id='cart'></img>
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
                const {id, name , price, image_url, rating} = item;
                const props = {id, name , price, image_url, rating};
                return (
                  <Item props = {props}></Item>
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
  return (
    <div className='product-item'>
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
        <div className='add-to-cart'><button type='submit' className='cart-button'>Add to Cart</button></div>
        <div className='buy-now'><button type='submit' className='now-buy'>Buy Now</button></div>
      </div>
    </div>
  )
}