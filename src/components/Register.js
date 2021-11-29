import axios from "axios";
import React, { useState } from 'react';
export const Register = () => {
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});

    const handleregSubmit = async e=> {
        e.preventDefault();
        if(regdetails.username === "" ||regdetails.password === "" ||regdetails.name === "" ||regdetails.surname === "") alert ("Please fill in the register form");
        else{
          axios.post('/addUser', {
            username: regdetails.username,
            password: regdetails.password,
            name:   regdetails.name,
            surname:regdetails.surname,
            gender: regdetails.gender,
          })
          .then(function (response) {
            console.log(response);
            if(response.data['result']==="Success")
              alert("Successful registration, you can now log in");
            else alert("Registration unsuccessful");
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }
    return (
        
        <div>
            <form onSubmit={handleregSubmit}>
              
          <h1 style={{fontsize:30,color:"#13b3ec"}}>Register</h1>
          
            <label>
              
                <p>Username <b style={{color:'red'}}>*</b></p>  
                <input type="text" onChange={e => setregDetails({...regdetails ,username: e.target.value})} value={regdetails.username} />
                
            </label>
            <label>
                <p>Password <b style={{color:'red'}}>*</b></p>
                <input type="password" onChange={e => setregDetails({...regdetails ,password: e.target.value})} value={regdetails.password} />
            </label>
            
            <label>
                <p>Name <b style={{color:'red'}}>*</b></p> 
                <input type="text" onChange={e => setregDetails({...regdetails ,name: e.target.value})} value={regdetails.name} />
                
            </label>
            <label>
                <p>Surname <b style={{color:'red'}}>*</b></p>
                <input type="text" onChange={e => setregDetails({...regdetails ,surname: e.target.value})} value={regdetails.surname} />
            </label>
            
              <p>Gender <b style={{color:'red'}}>*</b></p>
              <input type="radio" id="genderm" name="genderm" value="male" checked={regdetails.gender === "male"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
              <label htmlFor="genderm">Male</label><br></br>
              <input type="radio" id="genderf" name="genderf" value="female" checked={regdetails.gender === "female"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
              <label htmlFor="genderf">Female</label><br></br>
              <p style={{color:'red'}}>* Required infromations</p>
            <div>
            
            <button  type="submit" value="Register">Register</button>
            
            </div>
        </form>
        </div>
    )
}