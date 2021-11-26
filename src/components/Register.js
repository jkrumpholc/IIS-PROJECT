import axios from "axios";
import React, { useState } from 'react';
export const Register = () => {
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});

    const handleregSubmit = async e=> {
        e.preventDefault();

        axios.post('http://localhost:8000/addUser', {
            username: regdetails.username,
            password: regdetails.password,
            name:   regdetails.name,
            surname:regdetails.surname,
            gender: regdetails.gender,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
        }
    return (
        
        <div>
            <form onSubmit={handleregSubmit}>
          <h1 style={{fontsize:30,color:"#13b3ec"}}>Register</h1>
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
        </form>
        </div>
    )
}
