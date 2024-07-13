import React, { useState, useEffect } from 'react'
import close from './close.png'
import styles from './modal.module.css'
import favo from './favo.png'
import toast, { Toaster } from 'react-hot-toast';
import { Rating } from 'react-simple-star-rating'
import {motion} from 'framer-motion'

export default function Modal(props) {
  const userid = localStorage.getItem('userid');
  const obj = props.props.props;
  console.log(obj.catg);
  console.log(obj.id);
  const [isFav, setFav] = useState(false);
  let [amt,setAmt] = useState(1);
  const closeModal = ()=>{
    if(props.modal)
    {
      props.setmodal(false);
      document.body.style.overflow = 'visible'
    }
  }

  const increment = ()=>{
    if(amt < 6)
      setAmt((amt)=>amt+1);
  }
  const decrement = ()=>{
    if(amt != 1)
      setAmt((amt)=>amt-1);
  }

  const handleFav = async ()=>{
    const name = localStorage.getItem('user');
    const userid = localStorage.getItem('userid');
    if(!name)
    {
      console.log('im called');
      toast('Please Login to Continue!', {
        icon: '⛔',
      });
    }
    else{
      try {
          const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/addtofav', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({  userid:userid, name:obj.name, price:obj.price, image_url: obj.image_url, catg:obj.catg, product_id: obj.id,brand:obj.brand}),
          });
          const data = await response.json();
          if(response.ok)
          {
              if(data.message === 'Item Removed from Favorites'){
                setFav(false);
              }
              else if(data.message === 'Item Added to Favorites'){
                setFav(true);
              }
              toast.success(data.message,{
                  duration:2000,
                  position:'top-center'
              })
              console.log(data.message);
          }
          if(!response.ok){
              toast.error(data.message);
          }
      } catch (err) {
          throw(err);
      }
    }    
  }

  const handleCart = async ()=>{
    const name = localStorage.getItem('user');
    const userid = localStorage.getItem('userid');
    if(!name)
    {
      console.log('im called');
      toast('Please Login to Continue!', {
        icon: '⛔',
      });
    }
    else{
      try {
          const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/addtocart', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({  userid:userid, name:obj.name, price:obj.price, image_url: obj.image_url ,quantity:amt,brand:obj.brand}),
          });
          const data = await response.json();
          if(response.ok)
          {
              toast.success(data.message,{
                  duration:2000,
                  position:'top-center'
              })
              console.log(data.message);
          }
          if(!response.ok){
              toast.error(data.message);
          }
      } catch (err) {
          throw(err);
      }
    }    
  }

  useEffect(()=>{
    const checkFav = async ()=>{
    const userid = localStorage.getItem('userid');
      try{
        const response = await fetch('https://ecomm-api-enigmaybyte.onrender.com/api/users/checkfav', {
          method : 'POST',
          headers: {
            'Content-type' : 'application/json',
          },
          body: JSON.stringify({userid : userid, name : obj.name}),
        });
        const data = await response.json();
        console.log(data.fav);
        if(response.ok && data.fav !== 'no favorites')
        {
          if(data.fav === 'true')
            setFav(true);
        }
      }
      catch(err)
      {
        console.log(err);
      }
    }

    checkFav();
  },[userid, obj.name]);
    

  if(props.modal)
    document.body.style.overflow = 'hidden';
  return (
    <>
    <Toaster />
    <div className={styles.modal}>
      <div className={styles.main}>
        <div className={styles.cross}><img src={close} alt='crossbtn' onClick={closeModal}></img></div>
        <div className={styles.breadcrums}>Home <span className='slash'> / </span> Collection {obj.category}</div>
        <div className={styles.section}>
            <div className={styles.img_section}>
                <div className={styles.product_img}><img src={obj.image_url}></img></div>
            </div>
            <div className={styles.info_section}>
                <div className={styles.name}>
                  <div>{obj.name}</div>
                  { (isFav && userid )&& <img src={favo} alt='liked'></img>}
                </div>
                <div className={styles.brand}>By {obj.brand}</div>
                <div className={styles.price}>₹{obj.price}</div>
                <div className={styles.star}><Rating size={25} initialValue={obj.rating} allowFraction={true} readonly={true}/></div>
                <div className={styles.info}>{obj.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, omnis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione alias quos fugit nobis cum quam enim labore dolorum voluptatibus perferendis!</div>
                <div className={styles.amount}>
                  <div className={styles.amt_container}>
                    <div onClick={increment} className={styles.inc}>+</div>
                    <div className={styles.window}>{amt}</div>
                    <div onClick={decrement} className={styles.dec}>-</div>
                  </div>
                </div>
                <div className='buttons'>
                  <div className='buy-now'><motion.button type='submit' whileHover={{scale:1.03}} whileTap={{scale:0.95}} className='now-buy' onClick={handleCart}>Add to Cart</motion.button></div>
                  <div className='add-to-cart'><motion.button type='submit' whileHover={{scale:1.03}} whileTap={{scale:0.95}} className='cart-button' onClick={handleFav} >{ (isFav && userid) ? 'Remove from Favorites' : 'Add to Favorites'}</motion.button></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
