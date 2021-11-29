import axios from "axios";
import './Header.css';
import React, { useState, useEffect } from 'react';

export const ManageConf = (props) => {
    const [tickets, setTickets] = useState([]);
    const [pres, setPres] = useState([]);

    useEffect(() => {
        console.log(Object.keys(props.user).length!==0);
       
       if (Object.keys(props.user).length!==0 && Object.keys(props.selected_konf).length!==0){
        axios.post('/myConf', {
            id: props.selected_konf.id
          })
          .then(function (response) {
            console.log(response.data)
            if(response.data["result"]==="Success"){
              setTickets(response.data["tickets"])
              setPres(response.data['presentations'])
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

      const ConfirmTicket = (foo) => {
        console.log("Ticket to confirm: " + foo);
        axios.post('/myConfirm', {
          toconfirm:"Ticket",
          id:foo
        })
        .then(function (response) {
          console.log(response.data)
          if(response.data["result"]==="Success"){
            alert("Confirmed Ticket"); 
            //window.location.reload(false);
          }else if (response.data["result"]==="Failure"){
            alert("Failed to pay for ticket")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      const ConfirmPres = (foo) => {
        console.log("Ticket to confirm: " + foo);
        axios.post('/myConfirm', {
          toconfirm:"Presentation",
          id:foo
        })
        .then(function (response) {
          console.log(response.data)
          if(response.data["result"]==="Success"){
            alert("Confirmed Presentation"); 
            //window.location.reload(false);
          }else if (response.data["result"]==="Failure"){
            alert("Failed to confirm pres")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      const DeleteTicket = (foo) => {
        console.log("Ticket to delete: " + foo);
        axios.post('/myDelete', {
          todelete:"Ticket",
          id:foo
        })
        .then(function (response) {
          console.log(response.data)
          if(response.data["result"]==="Success"){
            alert("Deleted Ticket"); 
            //window.location.reload(false);
          }else if (response.data["result"]==="Failure"){
            alert("Failed to pay for ticket")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      const DeletePres = (foo) => {
        axios.post('/myDelete', {
          todelete:"Presentation",
          id:foo
        })
        .then(function (response) {
          if(response.data["result"]==="Success"){
            alert("Deleted presentation");
            //window.location.reload(false);
          }else if (response.data["result"]==="Failure"){
            alert("Failed to delete conference")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      const listItems = Object.values(tickets).map((item) =>
        <li key={item.id}>Username: {item.owner} | Status: {item.status} {item.status==="Reserved" ? 
          <button onClick={() => {DeleteTicket(item.id)}}>Delete</button>:<button onClick={() => {ConfirmTicket(item.id)}}>Confirm</button>}</li>
    );

    const listItems2 = Object.values(pres).map((item) =>
    <li key={item.id}>Prezentace: {item.description} | Time: {item.begin_time} - {item.end_time}
      <button onClick={() => {DeletePres(item.id)}}>Delete</button><button onClick={() => {ConfirmPres(item.id)}}>Confirm</button></li>
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
            <p><b>Konference presentations</b></p>
            <ul>{listItems2}</ul>
        </div>
    )
}

export default ManageConf

 