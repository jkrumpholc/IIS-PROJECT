import axios from "axios";
import './Miestnosti.css';
import React, { useState, useEffect } from 'react';
import {CreateConference} from './CreateConference';
import {RegisterPresentation} from './RegisterPresentation';
import { Link } from 'react-router-dom';

export const Miestnosti = (props) => {
    
    const [isToggledAdd, setIsToggledAdd] = useState(false);
    //const [isToggledReg, setIsToggledReg] = useState(false);
    const [Konf, setKonf] = useState([]);

    useEffect(() => {
        const getKonf = async () => {
           //  await fetchKonf();
            let KonfFromServ ;
            const response = await axios.get(`/availableConferences`)
            .then(function (response) {
                if (response.data["result"]==="Success"){
                     console.log("Success")
                     KonfFromServ = response.data["conferencies"]
                }
                else if (response.data["result"]==="Failure"){
                    alert("Failed to fetch "+response.data["reason"]);
                     KonfFromServ = "error";
                }
            })
            .catch(function (error) {
                console.log(error);
                alert("Server error");
                 KonfFromServ = "error";
            });

            console.log(KonfFromServ);
            if(KonfFromServ!=="error" && KonfFromServ!==undefined )
                setKonf(KonfFromServ);

        }
        getKonf();
    }, [props.user]);


    /*const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number,index) =>

    <Link to="/clicked_konf"><li key={index} >{number}</li></Link>
    );*/
  
        const listItems = Object.values(Konf).map((item) =>
        <Link to="/clicked_konf"><li onClick={() => {props.konfStateHandler(item)}}>Konference: {item.description} | Žánr: {item.genre} | Organizátor: {item.organizer} | prodané vstupenky: {item.participants}/{item.capacity} <br></br> Dátum: TODO, {item.begin_time} - {item.end_time}, Adresa: {item.address} </li></Link>
        );
 
    
    return (
        <div className = "confWrapper">
        <div id="myDIV" className="header">
            <h2>Konference</h2>
        <label for="myInput" style={{float:"left"}}>Search</label>  
        <input type="text" id="myInput" placeholder="Conference title..."/>
        {props.user["result"]==="Success"&& <span onClick={() =>{ setIsToggledAdd(!isToggledAdd );}} className="addBtn">Add</span>}
        </div>
        {isToggledAdd&& <CreateConference user={props.user}/>}
        
            <ul id="myUL">{listItems}</ul>
        </div>
    )
}
