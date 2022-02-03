import React from 'react'
import "./style.css"

export default function Wsw(props) {
    return (
        <div className="background">
            <div className="arrow" style={{transform: `rotate(${props.windDirection}deg)`}}></div>
        </div>
    )
}
