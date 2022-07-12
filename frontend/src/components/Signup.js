import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'


const Signup = ()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate = useNavigate();

    //If a user is signed in, then navigate to ('/')
    useEffect(()=>{
        const auth = localStorage.getItem('user')// getting from local storage
        if(auth)
        {
            navigate('/')
        } 
    })

    const collectData = async()=>{
        console.log(name,email,password);
            let result = await fetch('http://localhost:5000/register',{
                method:'POST',
                body: JSON.stringify({name, email, password}),
                headers:{
                'Content-Type': 'application/json'
                }  
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.result))// to store data in local storage and we can't store rusult in JSON formate so we strigyfy it before
        localStorage.setItem("token", JSON.stringify(result.auth))// to store data in local storage and we can't store rusult in JSON formate so we strigyfy it before
        navigate('/')
    }

    return (
        <div>
            <h1 className="register">Register</h1>
            <input className="inputBox" type="text" value={name} 
            onChange={(e)=>{setName(e.target.value)}} placeholder="Enter Name"></input>

            <input className="inputBox" type="text" value={email}
             onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter Email"></input>

            <input className="inputBox" type="password" value={password} 
            onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"></input>

            <button onClick={collectData} type="button" className="appButton">Signup</button>
        </div>
    )
}

export default Signup