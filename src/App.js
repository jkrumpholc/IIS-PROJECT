import React, { useState , useEffect } from 'react';
import './App.css';
import { Header  } from './components/Header';

import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { Miestnosti } from './components/Miestnosti';
import { User } from './components/User';


function App() {
  
  const [user, setUser] = useState([])
    
  const stateHandler = (foo)=> {
    setUser(foo);
  }

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("logged_user");
    console.log(loggedInUser);
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);
 


  return (
    <Router>
      <div className="Container">
      <Header/>

      <Routes>

        <Route path="/login"  element={<LoginForm  stateHandler={stateHandler} /> }/>
        <Route path="/miestnosti" element={<Miestnosti/>}/> 
        <Route path="/user" element={<User user ={user}/>}/> 

      </Routes>

      
      </div>
    </Router>
  );
}

export default App;
