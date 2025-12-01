import React from "react";
import { Routes, Route, Link } from "react-router-dom";


const Login = () => {

    return (
        <div>
            <h1>Login</h1>
            email <input type="email" placeholder="enter your email"/> <br/>
            password<input type="password" placeholder="Enter your password here"/><br />
            <button >Login</button><br/>
            <p>If you are not user, please rigester here </p>
        </div>
    )
};
//onClick={()=>{localStorage.setItem("login" , true)}
export default Login;
