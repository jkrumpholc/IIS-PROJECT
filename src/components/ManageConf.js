
import './Header.css';
import React, { useEffect } from 'react';

export const ManageConf = (props) => {

    useEffect(() => {
        console.log(Object.keys(props.user).length!==0);
       
       if (Object.keys(props.user).length!==0 && Object.keys(props.selected_konf).length!==0){
        /*axios.post('/myConf', {
            conf_id: props.selected_konf.id
          })
          .then(function (response) {
            //console.log(response.data['tickets']);
            if(response.data["result"]==="Success"){
            
            }else if (response.data["result"]==="Failure"){
             
            }
            //console.log(Konf)
          })
          .catch(function (error) {
            console.log(error);
          });*/
          console.log("Getting presentations and tickets of conference with id:" + props.selected_konf.id)
        }
      },[props.selected_konf, props.user])

  return (
        <div>
            <p><b>Building:</b> {props.selected_konf.address}</p>
            <p><b>Conference:</b> {props.selected_konf.id}</p>
            <p><b>Description:</b> {props.selected_konf.description}</p>
            
            <p><b>Date:</b> {props.selected_konf.date}</p>
            <p><b>From:</b> {props.selected_konf['begin_time']}<b> To: </b>{props.selected_konf['end_time'] }</p>
        </div>
    )
}

export default ManageConf

 