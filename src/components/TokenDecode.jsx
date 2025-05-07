import React, {useState, useEffect} from 'react'
import { jwtDecode } from 'jwt-decode';

import { createContext } from 'react';

export const TokenContext = createContext()


const TokenDecode = ({ children }) => {
    const [userData, setuserData] = useState(null)
    
    useEffect(() => {
      const token = localStorage.getItem("token")

      if(token){
        try {
            const decoded = jwtDecode(token)
            setuserData(decoded)
        } catch (error) {
            console.error("Token decoding failed:", error);
        }
        
      }
    }, [])
    
  return (
    <div>
      <TokenContext.Provider value={{userData }}>
       {children}
      </TokenContext.Provider>
    </div>
  )
}

export default TokenDecode
