import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

const Login = ()=>{
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    },[])

    const handleLogin = async ()=>{
        console.log(email,password);
        let result = await fetch('http://localhost:5000/login',{
            method:'POST',
            body: JSON.stringify({email, password}),
            headers:{
            'Content-Type': 'application/json'
            }  
        });
        result = await result.json();
        console.log(result)
        if(result.auth){
            localStorage.setItem("user",JSON.stringyfy(result.user))
            localStorage.setItem("token",JSON.stringyfy(result.auth))
            navigate("/")
        }else{
            alert("Please enter correct details")
        }
    }
    return (
        <div>
            <input type="text" className="inputBox" placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)} value = {email} />
            <input type="text" className="inputBox" placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)} value = {password}/>
            <button onClick={handleLogin} className="appButton" type="password">Login</button>
        </div>
    )
}
export default  Login;