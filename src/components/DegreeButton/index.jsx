import React from 'react'
import './style.css'

export default function DegreeButton(props) {
    return (
        <button className="degreeButton" onClick={props.onClick}>
            {props.content}
        </button>
    )
}
