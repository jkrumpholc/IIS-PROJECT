
import './Header.css';
import { Button } from './Button';
import NavButton from './NavButton';



export const Header = (props) => {

  const logoutUser = () =>{
    
    sessionStorage.clear();
    console.log("sdasdad");
  }
  const debug=()=>{
    console.log(props.user["result"]);
  }
 
  
  return (
        <header className="App-header" onClick={debug}>
        <div className="topnav">
          <h2>Konference</h2>
          <div className="topnav-right">

            
            <NavButton redirect="/" text="Home"/>
            {props.user["result"]!=="Success" && <NavButton redirect="/login" text="Sign In"/>}
            {props.user["result"]==="Success" && <NavButton  onClick={logoutUser} redirect="/login" text="Logout"/>}
            <NavButton redirect="/konference" text="Konference"/>
            <NavButton redirect="/user" text="Profile"/>
            
          </div>
        </div>
        </header>
    )
}

export default Header

 