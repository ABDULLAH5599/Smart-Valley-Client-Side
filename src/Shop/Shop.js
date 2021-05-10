import React, { useContext, useEffect, useState } from 'react';
import pic from '../image/image 34.png'
import './Shop.css'
import {useHistory} from 'react-router-dom';
import { UserContext } from '../App';
const Shop = (props) => {
  const [newproduct,setnewproduct]=useState([]);
 
  const [LoggedIn, setLoggedIn] =useContext(UserContext);
    const history = useHistory();
//const newproduct=props.product;
    const {name,price}=props.product;
  // console.log(newproduct);
   const id =props.product._id;
 
  
  useEffect(()=>{
    fetch('http://localhost:4000/allProduct')
    .then(res => res.json())
    .then(data => {
      setnewproduct(data);
        
    });
},[])
  const handleButton =(cartId)=>{
  const newId= cartId;
  const email= LoggedIn.email;
  const filterProduct= newproduct.find(pd => pd._id==newId);
 
 
  const myDatabaseinfo={...filterProduct};
  const {name,price}=myDatabaseinfo;
  const newdatabaseinfo={name ,price,email}
 // console.log(newdatabaseinfo);
  
    history.push(`/cart/:id${cartId}`);
    if(LoggedIn){
      fetch('http://localhost:4000/shopProduct',{
        method:'POST',
        headers:{ "content-type": "Application/json; charset=UTF-8"},
        body: JSON.stringify(newdatabaseinfo),
        
       
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
    }
    
  }
 
    return (
        <div className='cart-container'>
        <div className='cart-img'>
            <img src={pic} alt="" />
        </div>
        <div className='cart-item'>
         <h3>{name}</h3>
        
         </div> 
         <div className='cart-sub-item'>
         <p>$ {price}</p>
         <button onClick={() =>handleButton(id)}>SHOP NOW</button>

         
         
         </div>
        </div>
    );
};

export default Shop;