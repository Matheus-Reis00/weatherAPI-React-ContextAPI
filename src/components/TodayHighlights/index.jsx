import React from 'react'
import { useWeather } from '../../providers/WeatherProvider'
import Wsw from '../Wsw'
import './style.css'

export default function TodayHighlights() {
    const { weather } = useWeather()

    let weatherDateInforms = weather.data.consolidated_weather[0]

    return (
        <div className="todayHighlightsContainer">
            <header>
                <h1>Today's Highlights</h1>
            </header>
            <div className="highlights">
                <div className="highlightBlock">
                    <h2>Wind Status</h2>
                    <span><strong>{weatherDateInforms.wind_speed.toFixed(0)}</strong>mph</span>
                    <div className="compassContainer">
                        <Wsw windDirection={weatherDateInforms.wind_direction} />
                        <span>{weatherDateInforms.wind_direction_compass}</span>
                    </div>
                </div>
                <div className="highlightBlock">
                    <h2>Humidity</h2>
                    <span><strong>{weatherDateInforms.humidity}</strong>%</span>
                    <span>------------------------------</span>
                </div>
                <div className="highlightBlock">
                    <h2>Visibility</h2>
                    <span><strong>{weatherDateInforms.visibility.toFixed(1).replace(".", ",")}</strong>miles</span>
                </div>
                <div className="highlightBlock">
                    <h2>Air Presusre</h2>
                    <span><strong>{weatherDateInforms.air_pressure.toFixed(0)}</strong>mb</span>
                </div>
            </div>
        </div>
    )
}
