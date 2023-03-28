import { Context } from "./Context";
import { useContext } from "react";
import { BsFillTrashFill } from 'react-icons/bs'
import { useState } from "react";
import Paymant from './Paymant'
export default function Cart() {
  const elem = useContext(Context);
  const [count, setCount] = useState(1);
  const [money, setMoney] = useState(0); 
  return (
    <div className="card-container" style={{ clipPath: elem.show ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}>
      <div className="cart">
        {elem.shopList.map(shop => <div className="cart-item" key={shop.id}>
          <img src={shop.picture} alt="" />
          <h2>{shop.name}</h2>
          <div className="count-buttons">
            <button onClick={() => {
              if (shop.quanity < 2) return false
              else setCount(shop.quanity -= 1);
              setMoney(shop.price -= shop.isQuan)
              elem.setTotal(elem.total - shop.isQuan)
            }}>-</button>
            <span>{shop.quanity}</span>
            <button onClick={() => {
              setCount(shop.quanity += 1);
              setMoney(shop.price += shop.isQuan)
              elem.setTotal(elem.total + shop.isQuan)
            }}>+</button>
          </div>
          <h3>{shop.price}€</h3>
          <button onClick={() => {
            elem.removeElement(shop.id)
            elem.setTotal(elem.total - shop.price)
            shop.quanity = 1
            shop.price = shop.isQuan;
            if (elem.shopList.length < 2) {
              elem.setShow(false)
            }
          }}><BsFillTrashFill /></button>
        </div>)}
        <span className="total">Total : {elem.total}€</span>
        <button className='pay' onClick={() => elem.setShowPay(!elem.showPay)}>Pay With Card</button>
        <div className="valid-card" style={{ display: elem.showPay ? 'flex' : 'none' }}>
          <Paymant />
        </div>
      </div>
    </div>
  )
}
