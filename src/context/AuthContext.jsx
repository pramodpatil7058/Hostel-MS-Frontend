import { createContext, useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{

    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    useEffect(()=>{
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if(user && token){
            setUser(JSON.parse(user));
        }
    },[])

    const login = (loginData)=>{
        localStorage.setItem('user', JSON.stringify(loginData.user));
        localStorage.setItem('token', loginData.token);
        setUser(loginData.user);
    };

    const logout = ()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    }

    const fetchUser=()=>{
        axiosInstance.get(`/student/getStudent/${localStorage.getItem("studentId")}`)
                .then(res => {
                    setUserDetails(res.data);
                })
                .catch(err => {
                    
                    console.log(err)
                    
                })
    }

    return(
        <AuthContext.Provider value={{user, login, logout,fetchUser,userDetails}}>
            {children}
        </AuthContext.Provider>
    )
}