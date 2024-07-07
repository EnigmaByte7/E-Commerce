import React from 'react'
import close from './close.png'
import styles from './modal.module.css'
import star from './star.png'
import toast, { Toaster } from 'react-hot-toast';
import { Rating } from 'react-simple-star-rating'

export default function Modal(props) {
  const obj = props.props.props;
  const amt = 1;
  console.log(props);
  const closeModal = ()=>{
    if(props.modal)
    {
      props.setmodal(false);
      document.body.style.overflow = 'visible'
    }
  }
  const handleCart = ()=>{
    const name = localStorage.getItem('user');
    const userid = localStorage.getItem('userid');
    if(!name)
    {
      toast('Please Login to Continue!', {
        icon: '⛔',
      });
    }
    else{
      
    }    props.props.setmodal(false)
    document.body.style.overflow = 'visible';
  }
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
                <div className={styles.name}>{obj.name}</div>
                <div className={styles.brand}>By Homestead</div>
                <div className={styles.price}>₹{obj.price}</div>
                <div className={styles.star}><Rating size={25} initialValue={obj.rating} allowFraction={true} readonly={true}/></div>
                <div className={styles.info}>{obj.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, omnis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione alias quos fugit nobis cum quam enim labore dolorum voluptatibus perferendis!</div>
                <div className={styles.amount}>
                  <div className={styles.amt_container}>
                    <div className={styles.inc}>+</div>
                    <div className={styles.window}>{amt}</div>
                    <div className={styles.dec}>-</div>
                  </div>
                </div>
                <div className='buttons'>
                  <div className='buy-now'><button type='submit' className='now-buy'>Add to Cart</button></div>
                  <div className='add-to-cart'><button type='submit' className='cart-button' onClick={handleCart}>Add to Favorites</button></div>
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}
