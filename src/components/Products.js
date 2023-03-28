import React, { useContext, useEffect, useState } from 'react'
import { list } from './list';
import { AiFillShopping } from 'react-icons/ai'
import { CgColorPicker } from 'react-icons/cg'
import { Context } from './Context';
import Slider from './Slider';
export default function Products() {
    const elem = useContext(Context);
    const [col, setCol] = useState('');
    useEffect(() => {
        if (localStorage.getItem('bgcolor') !== null) {
            let newCol = localStorage.getItem('bgcolor', col);
            setCol(newCol);
        }
    }, [])

    return (
        <div className='products'>
            <header>
            <h2 className="money">{elem.money}$</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Service</li>
                <li>Contact</li>
                <li>Support</li>
            </ul>
                <h3 ref={elem.showName} className='prodName'></h3>
                <div className='menu-icons'>
                    <span>
                        <button onClick={() => elem.setShow(!elem.show)}><AiFillShopping /></button>
                        <span>{elem.shopList.length}</span>
                    </span>
                    <button><CgColorPicker /></button>
                    <input type='color' value={col} onChange={(e) => {
                        setCol(e.target.value);
                        localStorage.setItem('bgcolor', col);
                    }} />
                </div>
            </header>
            <Slider />
            <div className='products-slick' style={{ background: col }}>
                {list.map(item => { 
                    return (
                        <div className='border-sort' key={item.id}>
                            <div className='overlay'>
                                <h3>{item.isQuan}€</h3>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque temporibus iste corrupti sit</p>
                                <button onClick={() => {
                                    elem.showName.current.style.opacity = 1
                                    elem.showName.current.innerText = 'Added ' + item.name
                                    setTimeout(() => {
                                        elem.showName.current.style.opacity = 0
                                    }, 1000)
                                    if (elem.shopList.includes(item)) {
                                        return false
                                    }
                                    else {
                                        elem.addElement(item);
                                        elem.setTotal(elem.total + item.isQuan)
                                    }
                                }}><AiFillShopping /></button>
                            </div>
                            <div className='products-cart' key={item.id} style={{ background: `linear-gradient(${col}, black)` }}>
                                <img src={item.picture} alt="" />
                                <h2>{item.name}</h2>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

