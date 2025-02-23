import axios from "axios";
import { createContext, useContext, useState } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem("isLoggedIn") || false);
    const [user, setUser] = useState({})
    const [userId, setUserId] = useState(localStorage.getItem("studentId")||10000);
    // function getPayments(){
    //     axios.get("http://localhost:8087/warden/getAllPayments")
    //     .then(res => {
    //         setPayments(res.data);
    //     })
    //     .catch(err=> console.log(err))
    // }

    // function getPayment(id){
    //     axios.get(`http://localhost:8087/warden/getAllPendingPayments/${id}`)
    //     .then(res => {
    //         console.log("Payment with studentId"+res.data)
    //         setPayments(res.data);
    //     })
    //     .catch(err=> console.log(err))
    // }

    const logout = () => {
        localStorage.removeItem("isLoggedIn")
        setIsLoggedIn(false);
        window.location.href = "/login"
    }

    const updateLoginStatus = (status) => {
        setIsLoggedIn(status);
        window.localStorage.setItem("isLoggedIn", status);
    }

    const fetchUser = ()=>{

        axios.get(`http://localhost:8084/student/getStudentById/${userId}`)
        .then(res => {
            console.log("Called FetchUser")
           setUser(res.data);
        })
        .catch(err=> console.log(err))
    }

    return (
        <MyContext.Provider value={{ user, payments, isLoggedIn, updateLoginStatus,setUser, fetchUser, logout }}>
            {children}
        </MyContext.Provider>
    )
}