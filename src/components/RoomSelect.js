import React, { useState , useEffect } from 'react';
import "./Miestnosti.css"

export const RoomSelect = ({isChecked,rooms , checkStateHandler,calcCapacity}) => {


    useEffect(() => {
        calcCapacity();
    }, [isChecked.room1,isChecked.room2,isChecked.room3]);



    return (

        <div >
            <label className="container">{rooms.room1}
        <input type="checkbox" onChange={()=> {checkStateHandler({...isChecked,room1: !isChecked.room1});}} checked={isChecked.room1}/>
        <span className="checkmark"></span>
        </label>

        <label className="container">{rooms.room2}
        <input type="checkbox" onChange={()=> {checkStateHandler({...isChecked,room2: !isChecked.room2});}} checked={isChecked.room2}/>
        <span className="checkmark"></span>
        </label>

        <label className="container">{rooms.room3}
        <input type="checkbox" onChange={()=> {checkStateHandler({...isChecked,room3: !isChecked.room3});}} checked={isChecked.room3} />
        <span className="checkmark"></span>
        </label>

        </div>
    )
}