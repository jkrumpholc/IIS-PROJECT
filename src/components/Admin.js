
import { Navigate } from "react-router-dom";
import React, {useState , useEffect } from 'react';
import axios from "axios";
export const Admin = (props) => {

    const [konf, setKonf] = useState([]);
    const [pres, setPres] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
       
        if (Object.keys(props.user).length!==0 && props.user["id"] ==="OSBringer"){
            console.log("Admin access")
            /*
         axios.get('/getAdmin')
           .then(function (response) {
            if(response.data["result"]==="Success"){
            setKonf(response.data['conferencies'])
            setPres(response.data['prezentations'])
            setUsers(response.data['users'])
            }else if (response.data["result"]==="Failure"){
            }
           })
           .catch(function (error) {
             console.log(error);
           });*/
         }
       },[props.user])




    
    const listItems1 = Object.values(konf).map((item) =>
    <li>id: {item.id} | popis: {item.description} |  od: {item.begin_time} | do: {item.end_time} | prodané vstupenky: {item.participants}/{item.capacity}</li>
    );
    const listItems2 = Object.values(pres).map((item) =>
        <li>id: {item.id} | názov prezentácie: {item.name} | konference: {item.conference_name} | od: {item.begin_time} | do: {item.end_time} | potvrzeno: {item.confirmed ? "Ano":"Ne"}</li>
    );
    const listItems3 = Object.values(users).map((item) =>
        <li></li>
    );


    return (
        <div>
            {props.user["id"]==="OSBringer" &&
            
            <div>
                Admin
                
            </div>
            }
            {props.user["id"]!=="OSBringer"  &&
            <h1><a href="/">You are not an admin </a></h1>
            }
        </div>
    )
}
