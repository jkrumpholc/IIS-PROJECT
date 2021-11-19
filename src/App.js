import React, { useState , useEffect } from 'react';
import './App.css';
import { Header  } from './components/Header';

import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { Miestnosti } from './components/Miestnosti';
import { User } from './components/User';


function App() {
  const [user,setUser ]= useState({name:"",email:""})
  const [error,setError ]= useState("")
  
 
 
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);


  const Login =details =>{
      console.log(details);
     
     
      
      


  }


  return (
    <Router>
      <div className="Container">
      <Header/>

      <Routes>
        
        <Route path="/login"  element={<LoginForm Login={Login} error={error}/> }/>
        <Route path="/miestnosti" element={<Miestnosti/>}/> 
        <Route path="/user" element={<User />}/> 
          
      </Routes>

      
      </div>
    </Router>
  );
}

export default App;
