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
import {useParams} from 'react-router-dom'
const sofa = 'http://localhost:5000/products/sofa';
const  shelf = 'http://localhost:5000/products/shelf';
const table = 'http://localhost:5000/products/table';
const chair = 'http://localhost:5000/products/chair';
const bed = 'http://localhost:5000/products/bed';

export default function Product() {
  const {name} = useParams();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try{
      let res = await fetch(sofa);
      res = await res.json();
      console.log('fetched');
      console.log(res);
      setData(res.data);
    }
    catch(err){
      throw(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[]);

  console.log(data);

  if (data.length === 0){
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
        <li>Sofa & Couches</li>
        <li>Tables</li>
        <li>Chairs</li>
        <li>Beds</li>
        <li>Bookshelves</li>
      </ul>
    </div>
    <div className='category-field'>
      <div className='category-name'>Decor</div>
      <ul>
        <li>Vases</li>
        <li>Clocks</li>
        <li>Figurines</li>
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