import axios from "axios";
import React, { useState } from 'react';

export const ReserveAndRegister = (props) => {
    const [regdetails, setregDetails] = useState({username:"",password:"",name:"",surname:"",gender:"male"});
    const [ticketDetails, setTicketDetails] = useState({email:"",quantity:""});

    const SubmitResAndReg = async e=> {
        e.preventDefault();
        //console.log(ticketDetails)
        await axios.post('/addUser', {
            username: regdetails.username,
            password: regdetails.password,
            name:   regdetails.name,
            surname:regdetails.surname,
            gender: regdetails.gender,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios.post('/reserveTicket', {
            username: regdetails.username,
            konf_id: props.selected_konf['id'],
            quantity: ticketDetails.quantity,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const SubmitRes = async e=> {
        e.preventDefault();
        if(props.user['result']==='Success'){
            axios.post('/reserveTicket', {
                user_id: props.user['id'],
                konf_id: props.selected_konf['id'],
                quantity: ticketDetails.quantity,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        else {
            axios.post('/reserveTicket', {
                email: ticketDetails.email,
                konf_id: props.selected_konf['id'],
                quantity: ticketDetails.quantity,
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        
    }

    return (
        
        <div>
            <form onSubmit={SubmitRes}>
            <div>
                <br></br><br></br><header>Reserve ticket</header>
                <p>Number of tickets</p>
                <input type="number" onChange={e => setTicketDetails({...ticketDetails, quantity: e.target.value})} value={ticketDetails.quantity} />
            </div><br></br><br></br>
            {props.user['result']!=='Success' &&<div>
                <p>email</p>
                <input type="text" onChange={e => setTicketDetails({...ticketDetails ,email: e.target.value})} value={ticketDetails.email} />
            </div>}
            <button  type="submit" value="Register">Reserve</button>
            </form>
            {props.user['result']!=='Success' &&
            <form onSubmit={SubmitResAndReg}>
                <header>Reserve and Register</header>
                <label>
                    <p>Number of tickets</p>
                    <input type="number" onChange={e => setTicketDetails({...ticketDetails, quantity: e.target.value})} value={ticketDetails.quantity} />
                </label>
                <br></br><br></br>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setregDetails({...regdetails ,username: e.target.value})} value={regdetails.username} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setregDetails({...regdetails ,password: e.target.value})} value={regdetails.password} />
                </label>
                <label>
                    <p>Name</p>
                    <input type="text" onChange={e => setregDetails({...regdetails ,name: e.target.value})} value={regdetails.name} />
                </label>
                <label>
                    <p>Surname</p>
                    <input type="text" onChange={e => setregDetails({...regdetails ,surname: e.target.value})} value={regdetails.surname} />
                </label>
                <p>Gender</p>
                <input type="radio" id="genderm" name="genderm" value="male" checked={regdetails.gender === "male"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
                <label htmlFor="genderm">Male</label><br></br>
                <input type="radio" id="genderf" name="genderf" value="female" checked={regdetails.gender === "female"} onChange={e => setregDetails({...regdetails ,gender: e.target.value})}/>
                <label htmlFor="genderf">Female</label><br></br>
                <div>
                <button  type="submit" value="RegisterandReserve">Reserve and Register</button>
                </div>
            </form>}
        </div>
    )
}
