
import './Header.css';
//import { Button } from './Button';
import NavButton from './NavButton';

export const Header = () => {
    return (
        <header className="App-header">
        <div className="topnav">
          <h2>Konference</h2>
          <div className="topnav-right">

            
            <NavButton redirect="/" text="Home"/>
            <NavButton redirect="/login" text="Sign In"/>
            <NavButton redirect="/miestnosti" text="Miestnosti"/>
            <NavButton redirect="/user" text="Profile"/>

          </div>
        </div>
        </header>
    )
}

export default Header

 