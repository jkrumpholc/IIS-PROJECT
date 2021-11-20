import "./Miestnosti.css"
import React,{useState} from "react"



export const RegisterPresentation = () => {
    const[roomState,setRoomState]=  useState("");
    
    return (
        <div className="grid-container">
                
        <form  className="form" >  
            <label className="formLabels">
                Title:
                <br/>
                <input type="text" name="name" />
            </label>
            <br/>
            
            <label  className="formLabels">Date of Conference:
                <br/>
                <input type="date" id="dateOfConference" name="dateOfConference"/>
               
            </label>
           

            <label className="formLabels" > Time
            <br/>
                <input type="time" id="appt" name="appt" min="09:00" max="20:00" required/>

            </label>
            <label   className="formLabels" > Available rooms
            
            </label>
            <input type="submit" value="Submit" />
        </form>
            
        </div>
    )
}

