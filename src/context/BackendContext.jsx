import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);
    const [allPayments, setAllPayments] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("isLoggedIn") || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {})
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({})
    const [userNotFound, setUserNotFound] = useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [auth, setAuth] = useState({
        userId: 0,
        token: null,
        username: '',
        role: '',
    });
    const updateLoginStatus = (status) => {
        setIsLoggedIn(status);
        window.localStorage.setItem("isLoggedIn", status);
    }


    const fetchUser = async () => {
       
        if (localStorage.getItem("studentId")) {
            axiosInstance.get(`/student/getStudent/${localStorage.getItem("studentId")}`)
                .then(res => {
                    setUserDetails(res.data);
                    setUserNotFound(false)
                    setIsLoading(false)
                    setIsLoggedIn(true);
                })
                .catch(err => {
                    setUserNotFound(true);
                    if(err.status === 403){
                        logout();   
                        toast.error("You are not logged out of the session.");
                    }else if(err.status===404){
                        setUserDetails({})
                    }
                })
        }else{
            setUserDetails({})
            setUserNotFound(true);
        }

    }

    const fetchAllPayments = () => {
        setIsLoading(true)
        axiosInstance.get(`/payment/getAllPayments`)
            .then(res => {
                setAllPayments(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                
                setIsLoading(false)
                // toast.error("Unable to fetch payments",{className:"toast-error"})
            })
    }

    const fetchUserPayments = () => {
        setIsLoading(true)
        
    }
    const fetchUserLeaves = () => {
        setIsLoading(true)
        let url = ''
        if (user.roles === "WARDEN") {
            url = `/student/leave/allLeaves`
        } else {
            url = `/student/leave/getLeavesByStudentId/${user.id}`;
        }
        axiosInstance.get(url)
            .then(res => {
                setLeaves(res.data);
               
                setIsLoading(false)
            })
            .catch(err => {
                
                setIsLoading(false)
            })
    }

    const logout = ()=>{
        
        setIsLoggedIn(false);
        setUserNotFound(false)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("studentId");
        window.location.href="/login"
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
        // fetchUser()
        const token = localStorage.getItem('token');
        const username = user.email;
        const role = user.roles;
        const userId = user.id;
        if (token) {
            setAuth({ userId, token, username, role });
        }
    }, []);


    return (
        <MyContext.Provider value={{ token, user, setUser, payments,allPayments, fetchUserPayments,fetchAllPayments, leaves, fetchUserLeaves, isLoggedIn, updateLoginStatus,logout, isLoading, userNotFound, setUserNotFound, fetchUser, userDetails, setUserDetails, auth, setAuth }}>
            {children}
        </MyContext.Provider>
    )
}