import React from "react";
import furn from './furn.jpg'
import vs from './vs.jpg'
import li from './lights.jpg'
import art from './art.jpg'
import cdl from './candle.jpg'
import './index.css';
export default function Categories() {
  return (
    <>
    <div className="heading">Top Categories</div>
      <div className="categories">
        <div className="item furn"><img src={furn} alt='furniture'></img>
        <div className="label" id='spl'>Furniture</div>
        </div>
        <div className="item"><img src={vs} alt='furniture'></img>
        <div className="label">Vase</div></div>
        <div className="item"><img src={li} alt='furniture'></img>
        <div className="label">Lighting</div></div>
        <div className="item"><img src={art} alt='furniture'></img>
        <div className="label">Art</div></div>
        <div className="item"><img src={cdl} alt='furniture'></img>
        <div className="label">Candles</div></div>
      </div>
    </>
  );
}
