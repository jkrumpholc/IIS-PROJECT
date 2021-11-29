import "./Miestnosti.css"
import React,{useState} from "react"
import axios from "axios";


export const RegisterPresentation = (props) => {
    const [timeTo, setTimeTo] = useState("");
    const [timeFrom, setTimeFrom] = useState("");
    const [selectedFile, setSelectedFile] = useState({name:"",type:"",size:"",lastModifiedDate:""});
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [presName, setPresName] = useState("");
    const [presTags, setPresTags] = useState("");
    const [description, setDescription] =useState("");
    const changeHandler = (event) => {
        if(event.target.files[0]!==undefined){
            
		    setSelectedFile(event.target.files[0]);
		    setIsFilePicked(true);
        }
	};

    const handleSubmission = async e => {
        e.preventDefault();

        if ((timeFrom['timeFrom']>=props.selected_konf['begin_time'] && timeFrom['timeFrom']<=props.selected_konf['end_time'] ) &&
        (timeTo['timeTo']>=props.selected_konf['begin_time'] && timeTo['timeTo']<=props.selected_konf['end_time'] ) ){
           
        
        
            console.log(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
      

            let info;
            axios.post('/registerPresentation', {
                room_id: props.selectedRoom.id,
                username: props.user['id'],
                conf_id: props.selected_konf.id,
                timeFrom: timeFrom['timeFrom'],
                timeTo: timeTo['timeTo'],
                presName: presName['presName'],
                presTags: presTags['presTags'],
                description:description['description']
              })
              .then(function (response) {
                let info=response.data;
                if (info['result']==="failure"){
                    alert ("Request failed");
                }
              })
              .catch(function (error) {
                  alert ("Error");
                console.log(error);
              });

            if(info['result']==="Success"){
            axios({
                method: "post",
                url: "/registerPresentationFile",
                
                data: formData,

                headers: { "Content-Type": "multipart/form-data" },
                })
                .then(function (response) {

                if(response.data['result']==="Success"){
                    alert("Success");
                    console.log(response);
                }
                })
                .catch(function (error) {
                alert("Failed:",error);
                console.log(error);
                });

            }
                
                


        }else{
            alert("Please select time in conference interval");
        }
	};

    
    return (
        <div className="grid-container">
                
        <form  onSubmit={handleSubmission } className="form" >  
            <label className="formLabels">
                Title:
                <br/>
                <input onChange={e => setPresName({presName: e.target.value})}  type="text" name="name" required/>
            </label>
            <br/>

            <label className="formLabels">
                Description:
                <br/>
                <input  onChange={e=> setDescription({description: e.target.value})} type="text" name="description" required />
            </label>
            <br/>

            <label className="formLabels">
                Tags:
                <br/>
                <input onChange={e => setPresTags({presTags: e.target.value})} type="text" name="name" required/>
            </label>
            <br/>

            <label className="formLabels" > Time From
            <br/>
                <input onChange={e => setTimeFrom({timeFrom: e.target.value})} step="3600"  list="times" type="time" id="apptFrom" name="appt" required/>

            </label>

            <label className="formLabels" > Time To
            <br/>
                <input onChange={e => setTimeTo({timeTo: e.target.value}) } step="3600" list="times" type="time" id="apptTo" name="appt" required/>

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

            <input type="file" name="file" onChange={changeHandler} required />
            </label>
            <input type="submit" value="Submit" />
        </form>
            
        </div>
    )
}

