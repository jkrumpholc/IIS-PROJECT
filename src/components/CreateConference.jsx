import "./Miestnosti.css"
import React,{useState} from "react"



export const CreateConference = () => {
    const[roomState,setRoomState]=  useState("");
    const [timeTo, setTimeTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const handleAddSubmit = async e=> {
        e.preventDefault();

       
        var str1 =timeFrom["timeFrom"];
           var str2 =timeTo["timeTo"];
        if(str1>=str2){
            alert("Invalid time");
        }
        
        
        
       
        
    }

    return (
        <div className="grid-container">
                
        <form  onSubmit={handleAddSubmit} className="form" >  
            <label className="formLabels">
                Description:
                <br/>
                <input type="text" name="description" />
            </label>
            <br/>

            <label className="formLabels">
                Genre:
                <br/>
                <input type="textarea" name="genre" />
            </label>
            <br/>
            
            
           
           

            <label className="formLabels" > Time From
            <br/>
                <input onChange={e => setTimeFrom({timeFrom: e.target.value})}  type="time" id="apptFrom" name="appt" min="09:00" max="20:00" required/>

            </label>

            <label className="formLabels" > Time To
            <br/>
                <input onChange={e => setTimeTo({timeTo: e.target.value}) }  type="time" id="apptTo" name="appt" min="10:00" max="21:00" required/>

            </label>

            <label   className="formLabels" > Available rooms
            <select onChange={(e)=>{
                const selectedRoom=e.target.value;
                setRoomState(selectedRoom);
            }}>
                <option value="FIT">FIT - Božetěchova 1/2, 612 00 Brno-Královo Pole</option>
                <option value="FEKT">FEKT - Technická 3058/10, 616 00 Brno-Královo Pole</option>
                <option value="FSI">FSI - Technická 2896, 616 69 Brno-Královo Pole</option>
            </select> 
            {roomState}
            </label>
            <input type="submit" value="Submit" />
           

           
           
        </form>
            
        </div>
    )
}

