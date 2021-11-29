import React, { useState , useEffect } from 'react';
import './App.css';
import { Header  } from './components/Header';

import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { Miestnosti } from './components/Miestnosti';
import { User } from './components/User';
import { Clicked_konf } from './components/Clicked_konf';
import { ManageConf } from './components/ManageConf';
import { Schedule } from './components/Schedule';
import {Admin} from './components/Admin'

function App() {
  
  const [user, setUser] = useState([])
  const [selected_konf, setSelected_konf] = useState([])
  const [admin, setAdmin] = useState(false)
  const stateHandler = (foo)=> {
    setUser(foo);
  }
  const konfStateHandler = (foo) => {
    setSelected_konf(foo);
  }

  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("logged_user"))
    
    
    if (loggedInUser) {
     
      const foundUser = loggedInUser;
     
      setUser(foundUser);
      if(user['id']==="OSBringer"){
        setAdmin(true);
      }
    }
  }, []);
 


  return (
    <Router>
      <div className="Container">
      <Header user={user}/>

      <Routes>

        <Route path="/login"  element={<LoginForm  stateHandler={stateHandler} user={user} /> }/>
        <Route path="/konference" element={<Miestnosti  user={user} konfStateHandler={konfStateHandler} />}/> 
        <Route path="/user" element={<User user ={user} konfStateHandler={konfStateHandler}/>}/> 
        <Route path="/clicked_konf" element={<Clicked_konf selected_konf={selected_konf} user ={user}/>}/> 
        <Route path="/clicked_ticket" element={<Schedule user={user}/>}/> 
        <Route path="/admin" element={ <Admin user={user}/>}/> 
        <Route path="/myConference" element={<ManageConf selected_konf={selected_konf} user={user}/>}/> 
      </Routes>

      
      </div>
    </Router>
  );
}

export default App;
