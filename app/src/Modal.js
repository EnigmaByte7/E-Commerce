import React from 'react'
import close from './close.png'
import styles from './modal.module.css'

export default function Modal(props) {
  const obj = props.props.props;
  if(props.modal)
    document.body.style.overflow = 'hidden';
  return (
    <div className={styles.modal}>
      <div className={styles.main}>
        <div className={styles.cross}><img src={close} alt='crossbtn'></img></div>
        <div className={styles.section}>
            <div className={styles.img_section}>
                <div className={styles.breadcrums}>Home / Collection / {obj.category}</div>
                <div className={styles.product_img}><img src={obj.image_url}></img></div>
            </div>
            <div className={styles.info_section}>
                <div className={styles.name}>{obj.name}</div>
                <div className={styles.brand}>Homestead</div>
                <div className={styles.price}>{props.price}</div>
                <div className={styles.info}>{obj.info}</div>
                <div className={styles.amount}>Amount</div>
                <div className={styles.btn}><button type='button'>Add to Cart</button></div>
            </div>
        </div>
      </div>
    </div>
  )
}
