import React from "react";
import css from './Filter.module.css'

export const Filter = ({value , onChange}) => {
    return (
        <div className={css.filterDiv}>
            <p>Find contacts by name</p>
                <input type="text" 
                value={value} 
                onChange={onChange}/>
        </div>
    )
}