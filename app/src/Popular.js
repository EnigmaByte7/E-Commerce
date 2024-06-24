import React from 'react'
import arm from './arm.jpg'
import tbl from './tbl.jpg'
import vas from './vas.jpg'
import bag from './bag.png'
import fav from './fav.png'

export default function Popular() {
  return (
    <div className='pop'>
      <div className='heading'>Most Popular</div>
        <div className='flexbox'>
            <div className='item'>
                <img src={arm} alt='chair'></img>
                <div className='label new'>Cozy Armchair</div>
                <div className='price'>₹ 3500.00</div>
                <div className='clickables'>
                    <div className='fav'><img alt='clickables' src={fav}></img></div>
                    <div className='add'><img alt='clickables' src={bag}></img></div>
                </div>
            </div>
                <div className='item'>
                <img src={tbl} alt='chair'></img>
                <div className='label new'>Coffee Table</div>
                <div className='price'>₹ 5000.00</div>
                    <div className='clickables'>
                        <div className='fav'><img alt='clickables' src={fav}></img></div>
                        <div className='add'><img alt='clickables' src={bag}></img></div>
                    </div>
                </div>
            <div className='item'>
                <img src={vas} alt='chair'></img>
                <div className='label new'>Ceramic Vase</div>
                <div className='price'>₹ 1500.00</div>
                    <div className='clickables'>
                        <div className='fav'><img alt='clickables' src={fav}></img></div>
                        <div className='add'><img alt='clickables' src={bag}></img></div>
                    </div>
            </div>
        </div>
      </div>
  )
}
