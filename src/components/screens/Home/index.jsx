import React from 'react'
import "./style.css"

import LeftBar from "../../LeftBar"
import RightBar from "../../RightBar"


export default function Home() {
    return (
        <div className="container">
            <LeftBar/>
            <RightBar/>
        </div>
    )
}
