import React from 'react'
import fb from './fb.png'
import ins from './ins.png'
import x from './x.png'
import './index.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='foot-logo'>Oak & Ivory</div>
      <div className='head'>Customer Service</div>
      <div className='head'>About Us</div>
      <div className='head'>Legal</div>
      <div className='follow'>
        <div className='follow-text'>Follow Us</div>
        <div className='icon-flex'>
            <img src={fb} alt='social'></img>
            <img src={ins} alt='social'></img>
            <img src={x} alt='social'></img>
        </div>
      </div>
      <div className='list'>
        <ul>
            <li>Help & Contact</li>
            <li>Orders & Shipping</li>
            <li>Payments</li>
            <li>Returns & Refunds</li>
            <li>FAQs</li>
        </ul>
      </div>
      <div className='list'>
        <ul>
            <li>About Us</li>
            <li>Stores</li>
        </ul>
      </div>
      <div className='list'>
        <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Cookies Policy</li>
        </ul>
      </div>
      <div className='copy'>©Copyright 2024 Oak & Ivory. All Rights Reserved.</div>
    </div>
  )
}
