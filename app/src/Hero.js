import React from 'react'
import bag from './bag.png'
import avatar from './avatar.png'
import hero from './hero3.png'
export default function Hero() {
  return (
    <div className='Hero-container'>
      <img className='hero-img' src={hero} alt='main'></img>
      <Navbar />
      <div className='moto'>
        <div className='moto-text'>Decorate Your Dream Space <br/> With Our Finest Collection</div>
        <button className='explore'>Explore Collection</button>
      </div>
    </div>
  )
}

const Navbar = ()=>{
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
