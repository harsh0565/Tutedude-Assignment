import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider =(props)=>{
    const [auth,setAuth] =useState({
        user:null,
    })

    useEffect(()=>{
        const data  = localStorage.getItem("auth");
        if(data){
            // convert data into json
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
            })
        }
        // eslint-disable-next-line
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuth =()=> useContext(AuthContext);
export {useAuth , AuthProvider}