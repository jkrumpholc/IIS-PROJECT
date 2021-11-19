import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";





export default function LoginForm({Login, error}) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
    
    const [user, setUser] = useState()
  
  const handleSubmit = async e => {
    e.preventDefault();
    let user = [ details.username,details.password] ;
    const response = await axios.post(
      "http://localhost:8000/users",
      user
    );
    // set the state of the user
    setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', response.data)
    console.log(response.data)
  }
  return(

    
    <div className="login-wrapper">
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setDetails({...details ,username: e.target.value})} value={details.username} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setDetails({...details ,password: e.target.value})} value={details.password} />
            </label>
            <div>
            <button  type="submit" value="LOGIN">Submit</button>
            </div>
        </form>
    </div>
  )
}
