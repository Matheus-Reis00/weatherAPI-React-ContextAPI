import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DEGREESTYPES } from '../utils/constants'

export const WeatherContext = React.createContext({})

export const WeatherProvider = (props) => {

    const [weather, setWeather] = useState()
    const [weatherComplete, setWeatherComplete] = useState()
    const [location, setLocation] = useState(false)
    const [degreeType, setDegreeType] = useState(DEGREESTYPES.celsius)


    async function getWeather(lat, long) {
        let res = await axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
        let req = await axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${res.data[0].woeid}/`)
        setWeatherComplete(res.data[0])
        setWeather(req)
    }

    async function getWeatherByName(resource) {
        let citiesOptions = await axios.get(`https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/search/?query=${resource}`)
        return citiesOptions.data
    }

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition((position) => {
            getWeather(position.coords.latitude, position.coords.longitude)
            setLocation(true)
        })
      }, [])

    return (
        <WeatherContext.Provider value={{weather,weatherComplete, degreeType, setDegreeType,getWeatherByName, getWeather}}>
            {props.children}
        </WeatherContext.Provider>
    )
}

export const useWeather = () => React.useContext(WeatherContext)