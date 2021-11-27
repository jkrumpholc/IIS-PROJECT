
import { Link } from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import axios from "axios";

export const User = (props) => {

    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number,index) =>

    <Link to="/clicked_ticket"><li key={index} >{number}</li></Link>
    );
    
    useEffect(() => {
        

        

        return () => {
            
        }
    }, [])
        



    return (
        <div>
            {props.user["result"]==="Success"&&
                <p>logged in: {props.user["id"] }</p>
            }
            {props.user["result"]==="Success"&& <div>
                <p>Moje konferencie</p>
                <ul>{listItems}</ul></div>
            }
            {props.user["result"]==="Success"&& <div>
                <p>Moje prezentacie</p>
                <ul>{listItems}</ul></div>
            }
            {props.user["result"]==="Success" && <div>
                <p>Moje vstupekny</p>
                <ul>{listItems}</ul></div>
            }
        </div>
    )
}
