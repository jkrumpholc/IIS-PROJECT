
import './Header.css';
import { Button } from './Button';
import NavButton from './NavButton';



export const Header = (props) => {

  const logoutUser = () =>{
    sessionStorage.clear();
    console.log("sdasdad");
  }


  return (
        <header className="App-header">
        <div className="topnav">
          <h2>Konference</h2>
          <div className="topnav-right">

            
            <NavButton redirect="/" text="Home"/>
            {Object.keys(props.user).length===0 && <NavButton redirect="/login" text="Sign In"/>}
            {Object.keys(props.user).length!==0 && <NavButton  onClick={logoutUser} redirect="/login" text="Logout"/>}
            <NavButton redirect="/konference" text="Konference"/>
            <NavButton redirect="/user" text="Profile"/>
            
          </div>
        </div>
        </header>
    )
}

export default Header

 