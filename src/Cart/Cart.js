import React, { useContext, useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { UserContext } from '../App';
import './Cart.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
const Cart = () => {
    const {cartId} = useParams();
    const [cartOrderInfo,setcartOrderInfo]=useState({
    
        name:"",
      contactEmail:'',
        address:'',
        date:''
    });
   // console.log(cartOrderInfo);
    const [ cartProduct, setcartProdcut]=useState([]);
    //console.log(cartId);
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
    const total = cartProduct.reduce((total,product) => total+parseInt(product.price),0)
    useEffect(() => {
        fetch('http://localhost:4000/allCartProduct?email='+LoggedIn.email,{
            method:'GET',
            headers:{ 
                "content-type": "Application/json; "
            }
        })
        .then(res=> res.json())
        .then(data => setcartProdcut(data));

    },[])
  
     const handlesubmitOrder = ()=>{
        const {name,contactEmail,address,date}=cartOrderInfo;
        const email=LoggedIn.email;
        const cartDatabaseVulue={name,contactEmail,address,date,email}
        console.log(cartDatabaseVulue);
        if(LoggedIn){
            fetch('http://localhost:4000/addPlaceOrder',{
                method:'POST',
                headers:{ "content-type": "Application/json; charset=UTF-8"},
                body: JSON.stringify(cartDatabaseVulue),
            })
            .then(res => res.json())
            .then(data => {
              console.log(data)
            })
        }
        
     }
    const handleOrderCart=(e) =>{
        console.log(e.target.name,e.target.value);
         let isValidOrder =true;
         if(e.target.name === 'name'){
            isValidOrder= e.target.value;
         }
        if(e.target.name === 'contactEmail'){
            isValidOrder =/\S+@\S+\.\S+/.test(e.target.value);
          
        }
        if(e.target.name === 'address'){
            isValidOrder= e.target.value;
        }
        if(e.target.name === 'date'){
            isValidOrder= e.target.value;
        }
        if(isValidOrder){
          const newUser= {...cartOrderInfo};
           newUser[e.target.name]=e.target.value;
           setcartOrderInfo(newUser);

        }
    }
    



    return (
        <div>
            <h3>email:{LoggedIn.email} </h3>
             
              {
                 cartProduct.map(pdCart =>
                 <div className='cart'><p className='cart-item1'>Procduct Name: {pdCart.name}</p>
                      <p className='cart-item2'>price: ${pdCart.price}</p>
                     
                     
                 </div>) 
              }
              
              <br />
               <br />
               <br />
               <h2 className='total'>Total price :${total}</h2>
               <br />

               <h1> Order </h1>
               <br />
              
                  <input type="text"onBlur={handleOrderCart} name="name" placeholder='Enter Your Name'/>
                  <br />
                  <input type="email"onBlur={handleOrderCart} name="contactEmail" placeholder='Enter Your Email'/>
                  <br />
                  <input type="text"onBlur={handleOrderCart} name="address" placeholder='Enter Your address'/>
                  <br />
                  <input type="date"onBlur={handleOrderCart} name="date" id="" placeholder='Enter date'/>
                  <br />
              <Link to='/orders'>
           <button onClick={()=>handlesubmitOrder()} className='cart-btn'>  PlaceHolder </button>
           </Link>   
            
               
              
               <br />
               <br /> 
               <br /> 
               <br /> 
        </div>
    );
};

export default Cart;