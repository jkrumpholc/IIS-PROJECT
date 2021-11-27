import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";

import { Register } from './Register';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';




async function loginUser(credentials) {
  return fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});
    const [isToggledReg, setIsToggledReg] = useState(false);
    const handleSubmit = async e => {

      e.preventDefault();
      //let user = [ details.username,details.password] ;

      const response = await loginUser({
        username:details.username,
        password:details.password
      });
      
      

      /*
      const response = await axios.post('http://localhost:8000/login', {
        username: details.username,
        password: details.password,

      });
      // set the state of the user
      
      console.log(response.data);
      
      */
      props.stateHandler(response);
        if(response['result']=="Success"){

          sessionStorage.setItem("logged_user", JSON.stringify(response));
        }
    }

      

  return(

    
    <div className="login-wrapper">
        {props.user["result"]!=="Success" &&
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
        {props.user["result"]!=="Success"&&  <button  onClick={() =>{ setIsToggledReg(!isToggledReg );}} >Sign Up</button>}
        {props.user["result"]!=="Success"&& isToggledReg  && <Register/>}

        {props.user["result"]==="Success" && <div>Already logged in</div>}
    </div>




  )
}
