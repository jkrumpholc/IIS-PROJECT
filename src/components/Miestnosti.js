
import './Miestnosti.css';
import React, { useState } from 'react';
import {CreateConference} from './CreateConference';

export const Miestnosti = () => {
    
    const [isToggled, setIsToggled] = useState(false);

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
    <li>{number}</li>
    );
    
    
    

             
   

  
    return (
        <div className = "confWrapper">
        <div id="myDIV" className="header">
            <h2>Konference</h2>
        <label for="myInput" style={{float:"left"}}>Search</label>
        
        <input type="text" id="myInput" placeholder="Conference title..."/>
        
        <span onClick={()=> setIsToggled(!isToggled )} className="addBtn">Add</span>
            
        </div>
        {isToggled&& <CreateConference/>}

            <ul id="myUL">{listItems}</ul>
        </div>

    )
}
