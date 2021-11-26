import React, { useState } from 'react';
import './LoginForm.css';
import axios from "axios";



export default function LoginForm(props) {
    const [details, setDetails] = useState({username:"",email:"",password:""});
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});
    const handleSubmit = async e => {
      e.preventDefault();
      //let user = [ details.username,details.password] ;
      const response = await axios.get(
        `https://iis-project-2021.herokuapp.com/login?username=${details.username}&password=${details.password}`);
      // set the state of the user
      props.stateHandler(response.data);
        console.log(response.data);
        console.log(Object.keys(response.data));
        // store the user in localStorage
        if(Object.keys(response.data).length !== 0){
          sessionStorage.setItem("logged_user", response.data[0].username);
        }
      }

      const handleregSubmit = async ee => {
        ee.preventDefault();
        console.log(regdetails)
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
        {Object.keys(props.user).length === 0 &&
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

        {Object.keys(props.user).length !== 0 && <div>Already logged in</div>}
    </div>




  )
}
