import React, { useEffect, useState } from 'react';
import './styles.css'

import { useWeather } from '../../providers/WeatherProvider';
import { Fragment } from 'react/cjs/react.development';
import LoadingScreen from '../LoadingScreen';

export default function SearchScreen({setSearchWeather}) {
    const { getWeatherByName, getWeather } = useWeather()

    const [inputSearch, setInputSearch] = useState()
    const [cities, setCities] = useState()

    const [loading, setLoading] = useState(false)

    const handleRenderCities = async () => {
        setCities(await getWeatherByName(inputSearch))
    }

    const handleChangeWeatherInforms = async (latt, long) => {
        setLoading(true)
        await getWeather(latt, long)
    }

    useEffect(() => {
        setLoading(false)
    }, [getWeather])

    return (
        <Fragment>
            {loading && <LoadingScreen />}
            <div className='container-search-screen'>
                <header className='header-search-screen'>
                    <div className='container-close-button'>
                        <button className='close-button' onClick={() => setSearchWeather(false)}>x</button>
                    </div>
                    <div className='search-area'>
                        <label>City:</label>
                        <input type="text" placeholder='type and click search to display options' onChange={(e) => setInputSearch(e.target.value)} />
                        <button onClick={() => handleRenderCities()}>Search</button>
                    </div>

                </header>
                <div className="container-city-options">
                    {cities?.map(city => {
                        const latt_long = city.latt_long.split(',')
                        const latt = latt_long[0]
                        const long = latt_long[1]
                        return (
                            <button onClick={() => handleChangeWeatherInforms(latt, long)} className='city-block'>
                                <span>{city.title}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}
