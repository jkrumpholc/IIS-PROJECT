import React, { useState } from 'react';
import './App.css';
import { Header  } from './components/Header';

import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';


function App() {
  const [user,setUser ]= useState({name:"",email:""})
  const [error,setError ]= useState("")
  
  const Login =details =>{
      console.log(details);
      const data = { username: 'example' };

      fetch('http://localhost:8000/users')
      .then(response => response.json())
      .then(data => console.log(data));
  }
  

  return (
    <Router>
      <div className="Container">
      <Header/>
      
      <Routes>
        
        <Route path="/login"  element={<LoginForm Login={Login} error={error}/> }/>
        
             
          
      </Routes>

      
      </div>
    </Router>
  );
}

export default App;
