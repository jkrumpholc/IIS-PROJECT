import './Header.css';
import NavButton from './NavButton';



export const Header = (props) => {

  const logoutUser = () =>{
    
    sessionStorage.clear();
    
  }
  const debug=()=>{
    console.log(props.user["result"]);
  }
 
  
  return (
        <header className="App-header" onClick={debug}>
        <div className="topnav">
          <h2>Conference</h2>
          <div className="topnav-right">


            {props.user["id"]==="OSBringer" && <NavButton redirect="/admin" text="Admin"/>}
            <NavButton redirect="/" text="Home"/>
            {props.user["result"]!=="Success" && <NavButton redirect="/login" text="Sign In"/>}
            {props.user["result"]==="Success" && <NavButton  onClick={logoutUser} redirect="/login" text="Logout"/>}
            <NavButton redirect="/konference" text="Conference"/>
            {props.user["result"]==="Success" && <NavButton redirect="/user" text="Profile"/>}
            
          </div>
        </div>
        </header>
    )
}

export default Header

 