import React, { useState } from 'react';
import './LoginForm.css';






export default function LoginForm({Login, error}) {
    const [details, setDetails] = useState({username:"",email:"",password:""});

  
  const handleSubmit = async e => {
    e.preventDefault();
    Login(details);

    
  }
  return(

    
    <div className="login-wrapper">
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
        </form>
    </div>
  )
}
