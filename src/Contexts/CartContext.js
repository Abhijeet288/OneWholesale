
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();
export const CartProvider=({children})=>{
    const[cartItem,setCartItems]=useState([]);


    const addToCart=(item)=>{
        setCartItems((prev)=>{
            //checks the item in the cart is present or not
           const existing= prev.find(p=>p.id===item.id); 
           if(existing){
                //if there is matched and existing item then it will add onr more and also for new items
                return prev.map(p=>p.id===item.id?{...p,quantityCount:p.quantityCount+1}:p)  ;
           }
           else{
            //if there is no existing match item then it will add initial  item as quantitycoount 1.
            return [...prev,{...item,quantityCount:1}];
           }
        })
    }


    const removeFromCart=(id)=>{
        setCartItems((prev)=> prev.filter(item=>item.id!==id));  
    }

    const decreaseQuantity=(id)=>{
        setCartItems((prev)=>
             prev.map((item)=>item.id===id?{...item,quantityCount:quantity}:item).filter(item=>item.quantityCount>0)
        );
    }

    
    return(
    <CartContext.Provider value={{cartItem,setCartItems,addToCart,removeFromCart,decreaseQuantity}}>
        {children}
    </CartContext.Provider>
    );
}
export  const useCart=()=>useContext(CartContext);