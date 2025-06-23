import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext= createContext(null);

const CartContextProvider = ({ children }) =>{
   const [cartItems,setCartItems]= useState(0);
   const getItems = async ()=>{
    const token = localStorage.getItem("userToken");
    const response= await axios.get(`https://mytshop.runasp.net/api/Carts`,
        {
            headers:{
                Authorization:`Bearer ${token}`
        }
    }
    );
    setCartItems(response.data.cartResponse.length);
   }
   useEffect(()=>{
    getItems();
   },[])
   return <CartContext.Provider value={{cartItems, setCartItems}}>
     {children}
   </CartContext.Provider>

}
export default CartContextProvider;