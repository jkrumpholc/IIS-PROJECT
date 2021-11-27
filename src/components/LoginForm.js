import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";

import { Register } from './Register';



export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});
    const [isToggledReg, setIsToggledReg] = useState(false);
    const handleSubmit = async e => {

      e.preventDefault();
      //let user = [ details.username,details.password] ;
      const response = await axios.post('/loginUser', {
        username: details.username,
        password: details.password,

      });
      // set the state of the user
      props.stateHandler(response.data);
      console.log(response.data);
        if(response.data['result']=="Success"){

          sessionStorage.setItem("logged_user", JSON.stringify(response.data));
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
