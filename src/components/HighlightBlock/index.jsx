import React from 'react'
import './style.css'

export default function HighlightBlock(props) {
    return (
        <div className="highLightBlock">
            <span className="highlightDate">{props.date}</span>
            <img src={props.icon}/>
            <div className="minMaxContainer">
                <span className="highlightTime">{props.minTime}</span>
                <span className="highlightTime">{props.maxTime}</span>
            </div>
        </div>
    )
}
