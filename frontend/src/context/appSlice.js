import { createContext, useState } from "react";


export const AppContext = createContext({})
export const AppContectProvider = ({children})=>{

    const[getFunc ,setGetFunc]= useState(false)
    const[modalse ,setModals]= useState(false)
    const[modalBook ,setModalBook]= useState(false)
  return(
    <AppContext.Provider 
    value={{    
        getFunc ,
        setGetFunc,
        modalse,
        setModals,
        modalBook,
        setModalBook
    }}>
      {children}
    </AppContext.Provider>
  )

}