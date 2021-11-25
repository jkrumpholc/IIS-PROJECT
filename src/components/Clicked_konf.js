
import './Header.css';
import React, { useEffect } from 'react';

export const Clicked_konf = (props) => {
    useEffect(() => {
        //console.log(props.selected_konf)
      }, []);

  return (
        <div>
            <p>Konferencia {props.selected_konf.id}</p>
            <p>Popis: {props.selected_konf.description}</p>
        </div>
    )
}

export default Clicked_konf

 