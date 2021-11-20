
import './Miestnosti.css';
import React, { useState } from 'react';
import {CreateConference} from './CreateConference';
import {RegisterPresentation} from './RegisterPresentation';

export const Miestnosti = (props) => {
    
    const [isToggledAdd, setIsToggledAdd] = useState(false);
    const [isToggledReg, setIsToggledReg] = useState(false);

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
        {Object.keys(props.user).length!==0&& <span onClick={() =>{ setIsToggledAdd(!isToggledAdd ); setIsToggledReg(false );}} className="addBtn">Add</span>}
        {Object.keys(props.user).length!==0&& <span onClick={()=> { setIsToggledAdd(false);setIsToggledReg(!isToggledReg  );}} className="addBtn">Registrovať príspevok</span>}
        </div>
        {isToggledAdd&& <CreateConference/>}
        {isToggledReg&& <RegisterPresentation/>}
            <ul id="myUL">{listItems}</ul>
        </div>
    )
}
