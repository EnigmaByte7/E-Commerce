import React from 'react'
import './products-page.css';
import bag from './bag.png'
import avatar from './avatar.png'
import Navbar from './Navbar';
import vs from './vs-banner.jpg'
import star from './star.png'
import load from './loading.gif'
import { useState, useEffect } from 'react';
import Footer from './Footer'
import {useParams,Link} from 'react-router-dom'

export default function Product() {
  const {catg} = useParams();
  console.log(catg);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try{
      let res = await fetch(`http://localhost:5000/products/${catg}`);
      res = await res.json();
      setData(res.data);
      console.log(res.data);
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
  return (
    <>
    <div className='container'>
        <div className='navbar1'>
            <div className='logo'>Oak & Ivory</div>
            <div className='tabs'>
                <div className='home'>Home</div>
                <div className='collect'>Collections</div>
                <div className='abt'>About</div>
            </div>
            <div className='icons'>
                <img src={bag} alt='bag' id='cart'></img>
                <img src={avatar} alt='avatar' id='profile'></img>
            </div>
        </div>
        <img src={vs} className='central' alt='vs'></img>
        <div className='central-text'>Vase</div>
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