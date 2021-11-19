import React, { useState , useEffect } from 'react';
import './LoginForm.css';
import axios from "axios";



export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
   
  
    const handleSubmit = async e => {
      e.preventDefault();
      let user = [ details.username,details.password] ;
      const response = await axios.get(
        `http://localhost:8000/users?username=${details.username}`);
      // set the state of the user
      props.stateHandler(response.data);
        console.log(response.data)
        // store the user in localStorage
        localStorage.setItem("user", response.data)
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
