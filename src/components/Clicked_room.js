
import './Header.css';
import React, { useState, useEffect } from 'react';
import {RegisterPresentation} from './RegisterPresentation';
import {ReserveAndRegister} from './ReserveAndRegister';

export const Clicked_room = (props) => {
    const [isToggledRegPres, setisToggledRegPres] = useState(false);

    useEffect(() => {
        
      }, []);


    return (
        <div>
            <p><b>Building:</b> {props.selected_konf.address}</p>
            <p><b>Conference:</b> {props.selected_konf.id}</p>
            <p><b>Description:</b> {props.selected_konf.description}</p>
            
            <p><b>Date:</b> {props.selected_konf.date}</p>
            <p><b>From:</b> {props.selected_konf['begin_time']}<b> To: </b>{props.selected_konf['end_time'] }</p>
            <p><b>Selected room:</b> {props.selectedRoom.name} </p>
           
            {props.user["result"]==="Success"&& <span onClick={()=> {setisToggledRegPres(!isToggledRegPres);}} className="addBtn">Register presentation</span>}
            {isToggledRegPres&& <RegisterPresentation user={props.user} selected_konf={props.selected_konf}/>}
        </div>
    )
}

export default Clicked_room

 