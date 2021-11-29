import "./Miestnosti.css"
import React,{useState} from "react"
import axios from "axios";


export const RegisterPresentation = (props) => {
    const[time,setTime]=  useState("");

    const [selectedFile, setSelectedFile] = useState({name:"",type:"",size:"",lastModifiedDate:""});
	const [isFilePicked, setIsFilePicked] = useState(false);


    const changeHandler = (event) => {
        if(event.target.files[0]!==undefined){
		    setSelectedFile(event.target.files[0]);
		    setIsFilePicked(true);
        }
	};

    const handleSubmission = async e => {
        e.preventDefault();



        if (time['time']>=props.selected_konf['begin_time'] && time['time']<=props.selected_konf['end_time'] ){

            const formData = new FormData();
            formData.append('File', selectedFile);
            console.log(props.user['id']);
            
            
            axios.post("/registerPresentation",{
            conferenceID:props.selected_konf['id'],
            presentationTime : time['time'],
            data : formData

            })
        }else
            alert("Please select time in conference interval");

	};

    
    return (
        <div className="grid-container">
                
        <form  onSubmit={handleSubmission } className="form" >  
            <label className="formLabels">
                Title:
                <br/>
                <input type="text" name="name" />
            </label>
            <br/>

            <label className="formLabels" > Time
            <br/>
                <input onChange={e => setTime({time: e.target.value}) } type="time" id="appt" name="appt"  required/>

            </label>
            <label   className="formLabels" > Select presentation
            {isFilePicked  && (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) 
			}

            <input type="file" name="file" onChange={changeHandler} />
            </label>
            <input type="submit" value="Submit" />
        </form>
            
        </div>
    )
}

