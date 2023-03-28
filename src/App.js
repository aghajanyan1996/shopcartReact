import { useState,useRef } from 'react';
import './App.css';
import Products from './components/Products';
import { Context } from './components/Context';
import Cart from './components/Cart';

function App() {
    const [shopList, setShopList] = useState([]);
    const [show,setShow] = useState(false);
    const [total,setTotal] = useState(0);
    const [showPay, setShowPay] = useState(false);
    const showName = useRef(false);
    const [money, setMoney] = useState(Math.round(Math.random() * 20000));
    const addElement = (element) => {
      setShopList([...shopList, element])
    }

    const removeElement = (id) => {
        setShopList([...shopList.filter(item => item.id !== id)])
    }

    const elements = {
        shopList, setShopList,
        show,setShow,
        addElement,
        removeElement,
        total,setTotal,
        showName,
        showPay, setShowPay,
        money, setMoney
    }

    return (
      <Context.Provider value={elements}>
      <div className="App">
          <Products />
          <Cart />
      </div>  
      </Context.Provider>
    );
  }

export default App;


