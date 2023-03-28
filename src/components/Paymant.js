import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { AutoTabProvider } from "react-auto-tab";
import { Context } from "./Context";
export default function Paymant() {
  const elem = useContext(Context);
  const [valid,setValid] = useState({
    name : '', number : '', date : '', cvv : '', regionCode : '',
    code : '', num1 : '', num2 : '', num3 : ''
  })

  const handleChange = (e, field) => {
    setValid({...valid, [field] : e.target.value})
      if(valid.number.length === 4 || valid.number.length === 9 || valid.number.length === 14) {
          if(e.key === 'Backspace') {
                e.preventDefault();
                setValid({...valid, number : valid.number.slice(0,valid.number.length - 1)})
          }
          else {
            setValid({...valid, number : valid.number.concat('-')})
          }
      }
  }
  const nameRef = useRef();
  const numberRef = useRef();
  const dateRef = useRef();
  const cvvRef = useRef();
  const phoneRef = useRef();
  const check = useRef();
  const validName = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
  const validNumber = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
  const validDate = /^\d{2}\/\d{2}$/;
  const validCvv = /^\d{3}$/;
  const validRegion = /\+\d{3}$/;
  const validNums = /^\d{2}$/;
  const handleClick = () => {
      if(valid.name.match(validName) && valid.number.match(validNumber) && valid.date.match(validDate) && valid.cvv.match(validCvv) && valid.regionCode.match(validRegion) && valid.code.match(validNums) && valid.num1.match(validNums) && valid.num2.match(validNums) && valid.num3.match(validNums)) {
          if(elem.total <= elem.money) {
            check.current.style.opacity = 1;
            check.current.style.transform = 'scale(1)';
            check.current.innerText = 'Your Payment are Accept'
            check.current.style.color = 'green';
            setTimeout(() => {
            check.current.style.opacity = 0;
            check.current.style.transform = 'scale(0)';
            }, 2000);
            elem.setMoney(elem.money - elem.total);
            elem.setShopList([]);
            elem.shopList.map(item => {
              item.quanity = 1
              item.price = item.isQuan;
            })
            elem.setTotal(0);
          }
          else {
            check.current.style.opacity = 1;
            check.current.style.transform = 'scale(1)';
            check.current.innerText = 'You Have not enough money'
            check.current.style.color = 'red';
            setTimeout(() => {
              check.current.style.opacity = 0;
              check.current.style.transform = 'scale(0)';
              }, 2000);
          }
      }
      !valid.name.match(validName) ? nameRef.current.style.opacity = 1 : nameRef.current.style.opacity = 0;
      !valid.number.match(validNumber) ? numberRef.current.style.opacity = 1 : numberRef.current.style.opacity = 0;
      !valid.date.match(validDate) ? dateRef.current.style.opacity = 1 : dateRef.current.style.opacity = 0;
      !valid.cvv.match(validCvv) ? cvvRef.current.style.opacity = 1 : cvvRef.current.style.opacity = 0;
      !valid.regionCode.match(validRegion) || !valid.code.match(validNums) || !valid.num1.match(validNums) || !valid.num2.match(validNums) || !valid.num3.match(validNums) ? phoneRef.current.style.opacity = 1 : phoneRef.current.style.opacity = 0
  }
  return (
    <div className="form-container">
    <div className='form'>
    <div className="close" onClick={() => {
        elem.setShowPay(false);
    }}>X</div>
    <h2 className="payName">Pay With Master / Visa Card</h2>
    <img src="https://www.freepnglogos.com/uploads/visa-card-and-mastercard-logo-png-28.png" alt="" className="master"/>
    <AutoTabProvider>
        <label><input type="text" placeholder='Name Surname' value={valid.name} onChange={(e) => handleChange(e, 'name')} tabbable='false'/>
        <div className="invalid" ref={nameRef}></div>
        </label>
        <label><input type="text" placeholder='XXXX-XXXX-XXXX-XXXX' onKeyDown={handleChange} value={valid.number} onChange={(e) => handleChange(e, 'number')}  maxLength={19} tabbable='false'/>
        <div className="invalid" ref={numberRef}></div>
        </label>

        <label><input type="text" placeholder='02/22' maxLength={5} value={valid.date} onChange={(e) => handleChange(e, 'date')}  tabbable='false'/>
        <div className="invalid" ref={dateRef}></div>
        </label>

        <label><input type="text" placeholder='XXX' maxLength={3} value={valid.cvv} onChange={(e) => handleChange(e, 'cvv')}  tabbable='false'/>
        <div className="invalid" ref={cvvRef}></div>
        </label>
        <div className='number'>
        <label>
        <div className="invalid" ref={phoneRef}></div>
            <input type="text" placeholder='+374' maxLength={4} tabbable='false' onChange={(e) => handleChange(e, 'regionCode')}/>
            <input type="text" placeholder='XX' maxLength={2} tabbable='false' onChange={(e) => handleChange(e, 'code')}/>
            <input type="text" placeholder='XX' maxLength={2} tabbable='false' onChange={(e) => handleChange(e, 'num1')}/>
            <input type="text" placeholder='XX' maxLength={2} tabbable='false' onChange={(e) => handleChange(e, 'num2')}/>
            <input type="text" placeholder='XX' maxLength={2} tabbable='false' onChange={(e) => handleChange(e, 'num3')}/></label>
        </div>
        </AutoTabProvider>
        <button className='accept' onClick={handleClick}>Accept</button>
        <p className="yes" ref={check}>Your Payment are Accept</p>
    </div>
    </div>
  )
}


