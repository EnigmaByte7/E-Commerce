import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import './index.css';

export default function Navbar() {
  return (
    <div className='navbar'>
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
  )
}
