import React from "react";
import furn from './furn.jpg'
import vs from './vs.jpg'
import li from './lights.jpg'
import art from './art.jpg'
import cdl from './candle.jpg'
import './index.css';
import {easeInOut, motion} from 'framer-motion';
import {Link } from 'react-router-dom'

export default function Categories() {
  return (
    <>
    <div className="heading">Top Categories</div>
      <div className="categories">
        <div className="item furn">
          <Link to='/products/sofa'><motion.img whileHover={{scale:1.05, transition:{ ease:easeInOut} }} src={furn} alt='furniture'></motion.img>
          </Link><div className="label" id='spl'>Furniture</div>
        </div><div className="item">
          
        <Link to='/products/vase'><motion.img whileHover={{scale:1.05, transition:{ ease:easeInOut} }} src={vs} alt='furniture'></motion.img>
          </Link><div className="label">Vase</div>
        </div>
        <div className="item">
          <Link to='/products/lights1'><motion.img whileHover={{scale:1.05, transition:{ ease:easeInOut} }} src={li} alt='furniture'></motion.img>
        </Link><div className="label">Lighting</div>
        </div>
       <div className="item">
           <Link to='/products/art'><motion.img whileHover={{scale:1.05, transition:{ ease:easeInOut} }} src={art} alt='furniture'></motion.img>
        </Link><div className="label">Art</div>
        </div>
        <div className="item"><Link to='/products/candle'><motion.img whileHover={{scale:1.05, transition:{ ease:easeInOut} }} src={cdl} alt='furniture'></motion.img>
        </Link><div className="label">Candles</div></div>
      </div>
    </>
  );
}
