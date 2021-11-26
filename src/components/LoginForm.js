import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";



export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
  
    const handleSubmit = async e => {
      e.preventDefault();
      //let user = [ details.username,details.password] ;
      axios.post('http://localhost:8000/login', {
        username: details.username,
        password: details.password
      })

      .then((response) => {
        console.log(response);
        console.log(Object.keys(response.data));
        // store the user in localStorage
        if(Object.keys(response.data).length !== 0){
          sessionStorage.setItem("logged_user", response.data[0].username);
        }
      }, (error) => {
        console.log(error);
      });
    }




     

      
  
  return(

    
    <div className="login-wrapper">
        {Object.keys(props.user).length === 0 &&
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
        </form>}
        {Object.keys(props.user).length !== 0 && <div>Already logged in</div>}
    </div>
  )
}
