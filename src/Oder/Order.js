import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';


const Order = () => {
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
    const [order, setorder]=useState([]);
    //const Value=' you did not givbe'
     
    const [orderInfo ,setorderInfo]=useState([]);
    const total = order.reduce((total,product) => total+parseInt(product.price),0)
    useEffect(() => {
        fetch('http://localhost:4000/allCartProduct?email='+LoggedIn.email,{
            method:'GET',
            headers:{ 
                "content-type": "Application/json; "
            }
        })
        .then(res=> res.json())
        .then(data => setorder(data));

    },[])
    useEffect(() => {
        fetch('http://localhost:4000/placeOrderCartInfo?email='+LoggedIn.email,{
            method:'GET',
            headers:{ 
                "content-type": "Application/json; "
            }
        })
        .then(res=> res.json())
        .then(data => setorderInfo(data[0]));

    },[])
   
     let isValueIn=LoggedIn&&order&&orderInfo;
     if(isValueIn){
        isValueIn=false;
     }else{
        isValueIn=true;
     }
      
    return (
        <div>
          <div >
               <h1>{LoggedIn.email}</h1>
                <h1> Total Item :{order.length }</h1>
              <h1>Total Price: {total}</h1>

             <h1> Order Information</h1>
             <h3> Name: {orderInfo.name}</h3>
             <h3> Contact Email: {orderInfo.contactEmail}</h3>
             <h3> address: {orderInfo.address}</h3>
            <h3> date: {orderInfo.date}</h3>
            </div>
      
                {
                 isValueIn  && <div ><h1>Sorry !You did not Order AnyThing</h1></div> 
                } 
                 
         
            
        </div>
    );
};

export default Order;