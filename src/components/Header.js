
import './Header.css';
import { Button } from './Button';
import NavButton from './NavButton';

export const Header = () => {
    return (
        <header className="App-header">
        <div class="topnav">
          <h2>Konference</h2>
          <div className="topnav-right">

            
            <NavButton redirect="#" text="Home"/>
            <NavButton redirect="#" text="Sign In"/>
            <NavButton redirect="#" text="Miestnosti"/>
          </div>
        </div>
        </header>
    )
}

export default Header

 