import React from 'react'
import './style.css'

export default function Button(props) {
    return (
        <button className="defaultButton" onClick={props.onClick} style={{backgroundColor: props.backgroundColor}}>
            {props.content}
        </button>
    )
}
