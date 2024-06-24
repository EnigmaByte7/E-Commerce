import React from 'react'
import footer from './footer.jpg'

export default function Newsletter() {
  return (
    <div className='news'>
      <img src={footer} alt='newsletter'></img>
      <div className='main-text'>Stay in the Loop for Exclusive Offers!</div>
      <div className='sub-text'>Subscribe to our newsletter and get notifications of exclusive deals and offers.</div>
      <div className='form'>
        <form>
            <input type='text' className='input' value='Enter your email'></input>
            <button type='button' className='subs'>Subscribe</button>
        </form>
      </div>
    </div>
  )
}
