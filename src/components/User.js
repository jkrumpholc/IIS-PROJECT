import React, {Component, useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import './Miestnosti.css';


export const User = (props) => {
  const [Konf, setKonf] = useState([]);
  const [pres, setPres] = useState([]);
  const [tick, setTick] = useState([]);
  const DeleteConf = (foo) => {
    console.log("Conference to delete: " + foo);
    axios.post('/myDelete', {
      todelete:"Conference",
      id:foo
    })
    .then(function (response) {
      if(response.data["result"]==="Success"){
        alert("Deleted conference");
      }else if (response.data["result"]==="Failure"){
        alert("Failed to delete conference")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const DeletePres = (foo) => {
    console.log("Presentation to delete: " + foo);
    axios.post('/myDelete', {
      todelete:"Presentation",
      id:foo
    })
    .then(function (response) {
      if(response.data["result"]==="Success"){
        alert("Deleted conference");
      }else if (response.data["result"]==="Failure"){
        alert("Failed to delete conference")
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
      if(response.data["result"]==="Success"){
        alert("Deleted conference");
      }else if (response.data["result"]==="Failure"){
        alert("Failed to delete conference")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const listItems1 = Object.values(Konf).map((item) =>
  <li onClick={() => {props.konfStateHandler(item)}}><Link to="/myConference">id: {item.id} | description: {item.description} |  from: {item.begin_time} | to: {item.end_time} | sold tickets: {item.participants}/{item.capacity} | date : {item.date} 
    </Link><button classname="Deletebtn" onClick={() => {DeleteConf(item.id)}}>Delete</button></li>
  );
  const listItems2 = Object.values(pres).map((item) =>
    <li>id: {item.id} | presentation description: {item.name} | conference: {item.conference_name} | from: {item.begin_time} | to: {item.end_time} | confirmed: {item.confirmed ? "Yes":"No"}
      <button classname="Deletebtn" onClick={() => {DeletePres(item.id)}}>Delete</button></li>
  );
  const listItems3 = Object.values(tick).map((item) =>
    <li>id: {item.id} | conference: {item.conference} | price: {item.price} | state: {item.status}
    <button classname="Deletebtn" onClick={() => {DeleteTicket(item.id)}}>Delete</button></li>
  );
        
  //console.log({id:props.user['id']});

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
                <p>My conferencies</p>
                <ul>{listItems1}</ul></div>
            }
            {props.user["result"]==="Success"&& <div>
                <p>My presentations</p>
                <ul>{listItems2}</ul></div>
            }
            {props.user["result"]==="Success" && <div>
                <p>My tickets</p>
                <ul>{listItems3}</ul></div>
            }
        </div>
    )
}