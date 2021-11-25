import axios from "axios";
import './Miestnosti.css';
import React, { useState, useEffect } from 'react';
import {CreateConference} from './CreateConference';
import {RegisterPresentation} from './RegisterPresentation';
import { Link } from 'react-router-dom';

export const Miestnosti = (props) => {
    
    const [isToggledAdd, setIsToggledAdd] = useState(false);
    const [isToggledReg, setIsToggledReg] = useState(false);
    const [Konf, setKonf] = useState([]);

    useEffect(() => {
        const getKonf = async () => {
            const KonfFromServ = await fetchKonf();
            console.log(KonfFromServ);
            setKonf(KonfFromServ);
        }
        getKonf();
    }, []);

    const fetchKonf = async () => {
        const response = await axios.get(`http://localhost:8000/konferencie`);
        return response.data;
    }
    //const numbers = [1, 2, 3, 4, 5];
    //<li onClick={() => {}}>id: {item.id} | popis: {item.description} | žánr: {item.genre} | od: {item.time_from} | do: {item.time_to} | prodané vstupenky: {item.booked_tickets}/{item.max_capacity}</li>
    //);
    const listItems = Object.values(Konf).map((item) =>
    <Link to="/clicked_konf"><li onClick={() => {props.konfStateHandler(item)}}>id: {item.id} | popis: {item.description} | žánr: {item.genre} | od: {item.time_from} | do: {item.time_to} | prodané vstupenky: {item.booked_tickets}/{item.max_capacity}</li></Link>
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
