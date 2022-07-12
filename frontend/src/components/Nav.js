import React from 'react'
import {Link,  useNavigate} from 'react-router-dom'

const Nav = ()=>{

    const auth = localStorage.getItem('user')// taking data of from local storage if exist any
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear() //to clear the local storage cause the user wants to logout
        navigate('/signup')
    }

    return (
        <div>
          {/* { auth ? 
            <ul className='nav-ul'>
                <li><Link to = "/">Home page</Link></li>
                <li><Link to = "/add">Add Products</Link></li>
                <li><Link to = "/update">Update Products</Link></li>
                <li><Link to = "/profile">Profile</Link></li>
                <li><Link onClick={logout} to = "/signup" >Logout({JSON.parse(auth.name)})</Link></li>
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to = "/signup">Signup</Link></li>
                <li><Link to = "/login">Login</Link></li>
            </ul>
          } */}
          <ul className='nav-ul'>
                <li><Link to = "/">Home page</Link></li>
                <li><Link to = "/add">Add Products</Link></li>
                <li><Link to = "/update">Update Products</Link></li>
                <li><Link to = "/profile">Profile</Link></li>
                <li><Link to = "/signup" >Logout</Link></li>
                <li><Link to = "/signup">Signup</Link></li>
                <li><Link to = "/login">Login</Link></li>
            </ul>
        </div>
    )
}

export default Nav