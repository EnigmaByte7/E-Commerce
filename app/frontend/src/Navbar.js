import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import logout from './logout.png'
import './index.css';

export default function Navbar() {
    const user = localStorage.getItem('user');
    console.log(user);
  return (
    <div className='navbar'>
        <div className='logo'>Oak & Ivory</div>
        <div className='tabs'>
        <Link to='/'><div className='home'>Home</div></Link>
            <Link to='/products/sofa' ><div className='collect'>Collections</div></Link>
            <Link to='/about'><div className='abt'>About</div></Link>
        </div>
        <div className='icons'>
            <img src={bag} alt='bag' id='cart'></img>
            <img src={logout} alt='avatar' id='profile'></img>
        </div>
    </div>
  )
}
