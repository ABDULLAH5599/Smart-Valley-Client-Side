import React, { useContext , useEffect, useState  } from 'react';
import { UserContext } from '../App';
import Shop from '../Shop/Shop';


const Home = () => {
    const [product,setproduct]=useState([]);
    const [LoggedIn, setLoggedIn] =useContext(UserContext);
   
    useEffect(()=>{
        fetch('http://localhost:4000/allProduct')
        .then(res => res.json())
        .then(data => {
            setproduct(data);
            
        });
    },[])
   
    return (
        <div>
            <h5>{LoggedIn.email}</h5>
           //  
         {
               product.map(pd => <Shop product={pd}></Shop>) 
         }
        </div>
    );
};

export default Home;