
import './Header.css';
import React, { useState, useEffect } from 'react';
import {RegisterPresentation} from './RegisterPresentation';
import {ReserveAndRegister} from './ReserveAndRegister';
import { Link } from 'react-router-dom';

export const Clicked_konf = (props) => {
    const [isToggledRes, setisToggledRes] = useState(false);

    useEffect(() => {
        console.log(props.selected_konf.rooms)
      }, []);

    const listItems = Object.values(props.selected_konf.rooms).map((item) =>
        <Link to="/clickedRooom"><li key={item.id} onClick={() => {props.roomStateHandler(item); console.log(item)}}>Room: {item.name} | Room id: {item.id} </li></Link>
    );
      
    return (
        <div>
            <p><b>Building:</b> {props.selected_konf.address}</p>
            <p><b>Conference:</b> {props.selected_konf.id}</p>
            <p><b>Description:</b> {props.selected_konf.description}</p>
            
            <p><b>Date:</b> {props.selected_konf.date}</p>
            <p><b>From:</b> {props.selected_konf['begin_time']}<b> To: </b>{props.selected_konf['end_time'] }</p>
            
            <ul>{listItems}</ul>
           
            {<span onClick={() =>{ setisToggledRes(!isToggledRes)}} className="addBtn">Reserve tickets</span>}
            {isToggledRes&& <ReserveAndRegister selected_konf={props.selected_konf} user={props.user}/>}
        </div>
    )
}

export default Clicked_konf

 