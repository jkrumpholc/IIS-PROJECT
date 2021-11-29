import React, {Component, useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Miestnosti.css';


export const User = (props) => {
  const [Konf, setKonf] = useState([]);
  const [pres, setPres] = useState([]);
  const [tick, setTick] = useState([]);
  const numbers = [1, 2, 3, 4, 5];
  /*const listItems = numbers.map((number,index) =>

    <Link to="/clicked_ticket"><li key={index} >{number}</li></Link>
    );*/

  const listItems1 = Object.values(Konf).map((item) =>
    <li>id: {item.id} | popis: {item.description} |  od: {item.begin_time} | do: {item.end_time} | prodané vstupenky: {item.participants}/{item.capacity}</li>
  );
  const listItems2 = Object.values(pres).map((item) =>
    <li>id: {item.id} | názov prezentácie: {item.name} | konference: {item.conference_name} | od: {item.begin_time} | do: {item.end_time} | potvrzeno: {item.confirmed ? "Ano":"Ne"}</li>
  );
  const listItems3 = Object.values(tick).map((item) =>
    <li>id: {item.id} | konference: {item.conference} | cena: {item.price} | stav: {item.status}</li>
  );
        
  console.log({id:props.user['id']});

    useEffect(() => {
       console.log(Object.keys(props.user).length!==0);
       
       if (Object.keys(props.user).length!==0){
        axios.post('/profile', {
            id:props.user['id']
          })
          .then(function (response) {
            //console.log(response.data['tickets']);
            if(response.data["result"]==="Success"){
            setKonf(response.data['conferencies'])
            setPres(response.data['prezentations'])
            setTick(response.data['tickets'])
            }else if (response.data["result"]==="Failure"){
             
            }
            //console.log(Konf)
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      },[props.user])
     
    return (
        <div>
            {props.user["result"]==="Success"&&
                <p>logged in: {props.user["id"] }</p>
            }
            {props.user["result"]==="Success"&& <div>
                <p>Moje konferencie</p>
                <ul>{listItems1}</ul></div>
            }
            {props.user["result"]==="Success"&& <div>
                <p>Moje prezentacie</p>
                <ul>{listItems2}</ul></div>
            }
            {props.user["result"]==="Success" && <div>
                <p>Moje vstupekny</p>
                <ul>{listItems3}</ul></div>
            }
        </div>
    )
}