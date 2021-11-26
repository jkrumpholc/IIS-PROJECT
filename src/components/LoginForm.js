import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});
    const handleSubmit = async e => {
      
      e.preventDefault();
      //let user = [ details.username,details.password] ;
      const response = await axios.get(
        `http://localhost:8000/login?username=${details.username}&password=${details.password}`);
      // set the state of the user
      props.stateHandler(response.data);
      
        
        
        console.log(response.data);
        if(response.data['result']=="Success"){
          
          sessionStorage.setItem("logged_user", JSON.stringify(response.data));
        }
      }

      const handleregSubmit = async ee => {
        ee.preventDefault();
        console.log(regdetails)
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
        {props.user["result"]!=="Success" &&
        <form onSubmit={handleregSubmit}>
          <header style={{fontsize:30}}>Register</header>
            <label>
                <p>Username</p>
                <input type="text" onChange={e => setregDetails({...regdetails ,username: e.target.value})} value={regdetails.username} />
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setregDetails({...regdetails ,password: e.target.value})} value={regdetails.password} />
            </label>
            <label>
                <p>Name</p>
                <input type="text" onChange={e => setregDetails({...regdetails ,name: e.target.value})} value={regdetails.name} />
            </label>
            <label>
                <p>Surname</p>
                <input type="text" onChange={e => setregDetails({...regdetails ,surname: e.target.value})} value={regdetails.surname} />
            </label>
              <p>Gender</p>
              <input type="radio" id="genderm" name="genderm" value="male" checked={regdetails.gender === "male"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
              <label htmlFor="genderm">Male</label><br></br>
              <input type="radio" id="genderf" name="genderf" value="female" checked={regdetails.gender === "female"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
              <label htmlFor="genderf">Female</label><br></br>
            <div>
            <button  type="submit" value="Register">Register</button>
            </div>
        </form>}

        {props.user["result"]==="Success" && <div>Already logged in</div>}
    </div>




  )
}
