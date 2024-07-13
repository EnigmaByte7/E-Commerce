import React from 'react'
import cllct from './cllct.jpg'
import cust from './cust.jpg'
import hand from './hand.jpg'
import store from './stores.jpg'
import story from './story.jpg'
import './index.css';  
import { motion, useAnimation , easeInOut} from 'framer-motion';
export default function About() {
  
  return (
    <motion.div
    >
      <div className='heading'>About Us</div>
      <div className='grid-2'>
        <div className='item1' id='lrg'>
        <motion.img whileHover={{scale:1.05  }} src={cllct} alt='furniture'></motion.img>
            <div className='center'>Collection</div>
        </div>
        <div className='item1'>
        <motion.img whileHover={{scale:1.05  }} src={cust} alt='furniture'></motion.img>
            <div className='center'>Satisfied Customers</div></div>
        <div className='item1' id='extend'>
        <motion.img whileHover={{scale:1.05  }} src={story} alt='furniture'></motion.img>
            <div className='center Story'>Our Story
                <br/><div className='story'>At Oak & Ivory, we are passionate about crafting genuine oak products that transform your home into a sanctuary of style and elegance. Our journey began with a commitment to quality craftsmanship and customer satisfaction, which has driven us to curate a magnificent collection of decor. From timeless furniture pieces to exquisite accents, each item embodies our dedication to bringing beauty and functionality into your living spaces. Discover how Oak & Ivory can help you style your home, your way, with our unparalleled selection and attention to detail.</div>
                </div></div>
        <div className='item1'>
        <motion.img whileHover={{scale:1.05  }} src={store} alt='furniture'></motion.img>
            <div className='center'>50+ Stores</div></div>
        <div className='item1'>
        <motion.img whileHover={{scale:1.05  }} src={hand} alt='furniture'></motion.img>
            <div className='center'>Handmade Crafts</div></div>

      </div>
    </motion.div>
  )
}
