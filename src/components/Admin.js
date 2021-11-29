
import { Navigate } from "react-router-dom";
import React, {useState , useEffect } from 'react';
import axios from "axios";
export const Admin = (props) => {

    const [konf, setKonf] = useState([]);
    const [pres, setPres] = useState([]);
    const [users, setUsers] = useState([]);
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

      const DeleteUser = (foo) => {
        console.log("Presentation to delete: " + foo);
        axios.post('/myDelete', {
          todelete:"User",
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




    useEffect(() => {
       
        if (Object.keys(props.user).length!==0 && props.user["id"] ==="OSBringer"){
            console.log("Admin access")
            
         axios.get('/getAdmin')
           .then(function (response) {
            if(response.data["result"]==="Success"){
                setKonf(response.data['conferencies'])
                setUsers(response.data['users'])
                setPres(response.data['presentations'])
                setTick(response.data['tickets'])
                console.log(response.data);
            }else if (response.data["result"]==="Failure"){
            }
           })
           .catch(function (error) {
             console.log(error);
           });
         }
       },[props.user])


      
       const listItems1 = Object.values(konf).map((item) =>
       <li onClick={() => {props.konfStateHandler(item)}}>id: {item.id} | description: {item.description} |  from: {item.begin_time} | to: {item.end_time} | sold tickets: {item.participants}/{item.capacity} | date : {item.date} 
       <button classname="Deletebtn" onClick={() => {DeleteConf(item.id)}}>Delete</button></li>
       );
       

       const listItems2 = Object.values(users).map((item) =>
         <li>username: {item.username} | marked_presentation: {item.marked_prezentation} | name: {item.name} | surname: {item.surname} | gender: {item.gender}
         <button classname="Deletebtn" onClick={() => {DeleteUser(item.username)}}>Delete</button></li>
         
       );
     
   
       const listItems3 = Object.values(tick).map((item) =>
         <li>id: {item.id} | conference: {item.conference} | price: {item.price} | state: {item.status}
         <button classname="Deletebtn" onClick={() => {DeleteTicket(item.id)}}>Delete</button></li>
         
       );
       
        
    
       const listItems4 = Object.values(pres).map((item) =>
       <li>id: {item.id} | presentation description: {item.name} | conference: {item.conference_name} | from: {item.begin_time} | to: {item.end_time} | confirmed: {item.confirmed ? "Yes":"No"}
         <button classname="Deletebtn" onClick={() => {DeletePres(item.id)}}>Delete</button></li>
        );
      


    return (
        <div>
            {props.user["id"]==="OSBringer" &&
            
            <div>
               
                <div>
                {props.user["result"]==="Success"&&
                    <p> Admin: {props.user["id"] }</p>
                }
                {props.user["result"]==="Success"&& <div>
                    <p>Conferencies</p>
                    <ul>{listItems1}</ul></div>
                }
                {props.user["result"]==="Success"&& <div>
                    <p>Users</p>
                    <ul>{listItems2}</ul></div>
                }
                {props.user["result"]==="Success" && <div>
                    <p>Tickets</p>
                    <ul>{listItems3}</ul></div>
                }
                {   props.user["result"]==="Success" && <div>
                    <p>Presentations</p>
                    <ul>{listItems4}</ul></div>
                }
            </div>
            </div>
            }
            {props.user["id"]!=="OSBringer"  &&
            <h1><a href="/">You are not an admin </a></h1>
            }
        </div>
    )
}
