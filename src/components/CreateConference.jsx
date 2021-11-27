import './Miestnosti.css'
import React, { useState , useEffect } from 'react';
import { RoomSelect } from './RoomSelect';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const CreateConference = (props) => {
    //const[roomState,setRoomState]=  useState('');
    const [timeTo, setTimeTo] = useState('');
    const [timeFrom, setTimeFrom] = useState('');
    const [address, setAddress] =useState('FIT');
    const [description, setDescription] =useState('');
    const [genre, setGenre] =useState('');

    const [rooms, setRooms] = useState({room1:'',room2:'',room3:''});
    const [isChecked, setIsChecked] = useState({room1:false,room2:false,room3:false});
    const [capacity, setCapacity] = useState(0);


    const checkStateHandler = (foo) => {
        setIsChecked(foo);
    }

    
    const calcCapacity =() =>{
        var cislo = 0;
        console.log(isChecked);
        if(isChecked.room1) cislo += 50;
        console.log('1 '+cislo);
        if(isChecked.room2) cislo += 50;
        console.log('2 '+cislo);
        if(isChecked.room3) cislo += 50;
        console.log('3 '+cislo);
        setCapacity(cislo)
    }


    useEffect(() => {
        setIsChecked({room1:false,room2:false,room3:false});
        setCapacity(0);
        
        switch(address){
            case 'FIT':
                setRooms({ room1: 'd105',room2:'d206',room3:'e112'})

                break;
            case 'FEKT':
                setRooms({ room1: 'T12',room2:'T08',room3:'T10'})

                break;
            case 'FSI':
                    setRooms({ room1: '1',room2:'2',room3:'3'})
    
                    break;

        }

    }, [address]);

    

    const handleAddSubmit = async e=> {
        e.preventDefault();
       
        var str1 =timeFrom['timeFrom'];
           var str2 =timeTo['timeTo'];
        if(str1>=str2){
            alert('Invalid time');
        }
        
       
        const r = JSON.parse('{"'+rooms.room1+'":'+isChecked.room1+','+
            '"'+rooms.room2+'":'+isChecked.room2+','+
            '"'+rooms.room3+'":'+isChecked.room3+
            '}');
        
        

        axios.post('http://localhost:8000/addConference', {
            organizer:props.user["id"],
            description:description,
            genre:genre,
            address:address,
            rooms: r,
            capacity:capacity,
            timeTo: str2,
            timeFrom: str1
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          


    }
    
    const roundFunc = e => {
        let x = e.target.value.split(':');
        console.log(x);
        /*if (x[1] > 0 && x[1] < 15) {
          x[1] = "00";
        } else if (x[1] > 44 && x[1] < 60) {
          x[0] = x[0] < 10 ? "0" + (parseInt(x[0]) + 1) : parseInt(x[0]) + 1;
          x[1] = "00";
        }
        else {
          x[1] = "30";
        }
        e.target.value = x.join(':');
        */
    }
      
     


    return (
        
        <div className='grid-container'>
                
        <form  onSubmit={handleAddSubmit} className='form' >  
            <label className='formLabels'>
                Description:
                <br/>
                <input  onChange={e=> setDescription({description: e.target.value})} type='text' name='description' />
            </label>
            <br/>

            <label className='formLabels'>
                Genre:
                <br/>
                <input onChange={e=> setGenre({genre: e.target.value})} type='textarea' name='genre' />
            </label>
            <br/>


            <label className='formLabels' > Time From
            <br/>
                <input onChange={e =>{ roundFunc();setTimeFrom({timeFrom: e.target.value})}}  type='time' id='apptFrom' name='appt' min='09:00' max='20:00' required/>

            </label>

            <label className='formLabels' > Time To
            <br/>
                <input onChange={e =>{ roundFunc(); setTimeTo({timeTo: e.target.value}) }}  type='time' id='apptTo' name='appt' min='10:00' max='21:00' required/>

            </label>

            <label   className='formLabels' > Select building
            <select onChange={(e)=>{
                const address=e.target.value;
                
                setAddress(address);
            }}>
                <option  value='FIT'>FIT - Božetěchova 1/2, 612 00 Brno-Královo Pole</option>
                <option  value='FEKT'>FEKT - Technická 3058/10, 616 00 Brno-Královo Pole</option>
                <option  value='FSI'>FSI - Technická 2896, 616 69 Brno-Královo Pole</option>
            </select> 
            <p style={{display:'block'}}>Capacity: {capacity}</p>
                
            {<RoomSelect   isChecked={isChecked} rooms={rooms} checkStateHandler={checkStateHandler} calcCapacity={calcCapacity}/>}
            
            </label>
            <input type='submit' value='Submit' />

            
        </form>
           
        </div>
        
      
    )
}

