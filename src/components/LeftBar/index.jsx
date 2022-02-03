import React, { useEffect, useState } from 'react'
import DefaultButton from '../DefaultButton'
import "./style.css"

import { BiCurrentLocation } from 'react-icons/bi'
import { WiDayShowers } from 'react-icons/wi'
import { HiLocationMarker } from 'react-icons/hi'
import SearchScreen from '../SearchScreen'
import { Fragment } from 'react/cjs/react.development'
import { useWeather } from '../../providers/WeatherProvider'
import LoadingScreen from '../LoadingScreen'
import { DEGREESTYPES } from '../../utils/constants'

export default function LeftBar() {
    const { weather, degreeType, weatherComplete, getWeather } = useWeather()

    const [searchWeather, setSearchWeather] = useState(false)
    const [loading, setLoading] = useState(false)
    const [degree, setDegree] = useState('')
    const currentDate = new Date()

    const handleGetCurrentLocation = () => {
        setLoading(true)
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude)
        })
    }

    useEffect(() => {
        setLoading(false)
    }, [handleGetCurrentLocation])

    useEffect(() => {
        switch (degreeType) {
            case DEGREESTYPES.celsius:
                const celsius = weather?.data.consolidated_weather[0].the_temp.toFixed(0)
                console.log(celsius)
                setDegree(celsius + 'ºC')
                break;
            case DEGREESTYPES.fahrenheit:
                const fahrenheit = (weather?.data.consolidated_weather[0].the_temp * 9 / 5) + 32
                setDegree(fahrenheit.toFixed(0) + 'ºF')
                break
            default:
                break;
        }
    }, [weather, degreeType])

    return (
        <Fragment>
            {loading && <LoadingScreen />}
            <div className="leftBar">
                {searchWeather ?
                    <SearchScreen setSearchWeather={setSearchWeather} />
                    :
                    <Fragment>
                        <header className="header">
                            <DefaultButton content="Search location" backgroundColor="rgba(33, 184, 206, 1)" onClick={() => setSearchWeather(true)} />
                            <button className="currentLocationButton" onClick={() => handleGetCurrentLocation()}><BiCurrentLocation size="25" /></button>
                        </header>
                        <div className="timeContent">
                            <WiDayShowers size="150" color="white" />
                            <span className="timeDegree">{degree ? degree : ''}</span>
                            <span className="timeSituacion">{weather?.data.consolidated_weather[0].weather_state_name}</span>
                        </div>
                        <div className="cityInforms">
                            <span className="location"><HiLocationMarker color="#606060" />{weatherComplete?.title}</span>
                            <span className="date">{`${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`}</span>
                        </div>
                    </Fragment>
                }

            </div>
        </Fragment>
    )
}
