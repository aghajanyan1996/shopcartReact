import React,{useState} from 'react'
import {MdOutlineArrowBackIosNew , MdOutlineArrowForwardIos} from 'react-icons/md';
export default function Slider() {
    const [current,setCurrent] = useState(0);
    const offset = 100
  return (
    <div className="slider-container">
   
    <button onClick={() => {
        current < 100 ? setCurrent(300) : setCurrent(current - offset)
    }}> <MdOutlineArrowBackIosNew /></button>
    <button onClick={() => {
        current > 200 ? setCurrent(0) : setCurrent(current + offset)
}}> <MdOutlineArrowForwardIos /></button>
<h2 className='namename'>ONLINE SHOP</h2>
        <div className='slider' style={{left:`${-current}%`}}>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
            <div className="item"></div>
        </div>
    </div>
  )
}
