
import './Header.css';
import React, { useState, useEffect } from 'react';
import {RegisterPresentation} from './RegisterPresentation';
import {ReserveAndRegister} from './ReserveAndRegister';

export const Clicked_konf = (props) => {
    const [isToggledRes, setisToggledRes] = useState(false);
    const [isToggledRegPres, setisToggledRegPres] = useState(false);

    useEffect(() => {
        //console.log(props.selected_konf)
      }, []);

  return (
        <div>
            <p>Konferencia {props.selected_konf.id}</p>
            <p>Popis: {props.selected_konf.description}</p>
            {<span onClick={() =>{ setisToggledRes(!isToggledRes)}} className="addBtn">Reserve tickets</span>}
            {props.user["result"]==="Success"&& <span onClick={()=> {setisToggledRegPres(!isToggledRegPres);}} className="addBtn">Register presentation</span>}
            {isToggledRes&& <ReserveAndRegister selected_konf={props.selected_konf} user={props.user}/>}
            {isToggledRegPres&& <RegisterPresentation user={props.user} selected_konf={props.selected_konf}/>}
        </div>
    )
}

export default Clicked_konf

 