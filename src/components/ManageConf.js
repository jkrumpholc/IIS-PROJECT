import axios from "axios";
import './Header.css';
import React, { useState, useEffect } from 'react';

export const ManageConf = (props) => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        console.log(Object.keys(props.user).length!==0);
       
       if (Object.keys(props.user).length!==0 && Object.keys(props.selected_konf).length!==0){
        axios.post('/myConf', {
            id: props.selected_konf.id
          })
          .then(function (response) {
            if(response.data["result"]==="Success"){
              setTickets(response.data["tickets"])
            }else if (response.data["result"]==="Failure"){
              alert("Failed to load tickets")
            }
          })
          .catch(function (error) {
            console.log(error);
          });
          console.log("Getting presentations and tickets of conference with id:" + props.selected_konf.id)
        }
      },[props.selected_konf, props.user])

      const listItems = Object.values(tickets).map((item) =>
        <li key={item.id}>Username: {item.owner} | Status: {item.status} </li>
    );

  return (
        <div>
            <p><b>Building:</b> {props.selected_konf.address}</p>
            <p><b>Conference:</b> {props.selected_konf.id}</p>
            <p><b>Description:</b> {props.selected_konf.description}</p>
            
            <p><b>Date:</b> {props.selected_konf.date}</p>
            <p><b>From:</b> {props.selected_konf['begin_time']}<b> To: </b>{props.selected_konf['end_time'] }</p>
            <p><b>Konference tickets</b></p>
            <ul>{listItems}</ul>
        </div>
    )
}

export default ManageConf

 