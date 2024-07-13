import React from 'react'
import arm from './arm.jpg'
import tbl from './tbl.jpg'
import vas from './vas.jpg'
import bag from './bag.png'
import fav from './fav.png'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'

export default function Popular() {
  return (
    <div className='pop'>
      <div className='heading'>Most Popular</div>
        <div className='flexbox'>
            <Link to='/products/chair'><motion.div  className='item'><motion.img whileHover={{scale:1.05}} src={arm} alt='furniture'></motion.img>
                <div className='label new'>Cozy Armchair</div>
                <div className='price'>₹ 3500.00</div>
                <div className='clickables'>
                    <div className='fav'><img alt='clickables' src={fav}></img></div>
                    <div className='add'><img alt='clickables' src={bag}></img></div>
                </div>
            </motion.div></Link>
                <Link to='/products/table'><div className='item'><motion.img whileHover={{scale:1.05  }} src={tbl} alt='furniture'></motion.img>
                <div className='label new'>Coffee Table</div>
                <div className='price'>₹ 5000.00</div>
                    <div className='clickables'>
                        <div className='fav'><img alt='clickables' src={fav}></img></div>
                        <div className='add'><img alt='clickables' src={bag}></img></div>
                    </div>
                </div></Link>
            <Link to='/products/vase'><div className='item'>
                <motion.img whileHover={{scale:1.05  }} src={vas} alt='furniture'></motion.img>
                <div className='label new'>Ceramic Vase</div>
                <div className='price'>₹ 1500.00</div>
                    <div className='clickables'>
                        <div className='fav'><img alt='clickables' src={fav}></img></div>
                        <div className='add'><img alt='clickables' src={bag}></img></div>
                    </div>
            </div></Link>
        </div>
        <div className='button-center'><Link to='/products/sofa'><motion.button whileHover={{scale:1.03, color:'white', backgroundColor:'#222', transition:{duration:0.5}}} whileTap={{scale:0.95}} type='button' className='view'>View All</motion.button></Link></div>
      </div>
  )
}
