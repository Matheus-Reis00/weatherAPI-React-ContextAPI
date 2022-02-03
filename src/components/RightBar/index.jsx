import React from 'react'
import "./styles.css"

import { useWeather } from '../../providers/WeatherProvider'
import { DEGREESTYPES } from '../../utils/constants'

import TodayHighlights from '../TodayHighlights'
import DegreeButton from '../DegreeButton'
import HighlightBlock from "../HighlightBlock"

export default function RightBar() {
    const { weather, degreeType, setDegreeType } = useWeather()


    function renderHighlightsBlock() {
        if (weather != undefined) {
            let weatherTempInforms = weather.data
            let weatherDateInforms = weather.data?.consolidated_weather
            return (
                weatherDateInforms?.map((atributo, key) => {
                    const icon = `https://www.metaweather.com/static/img/weather/${atributo.weather_state_abbr}.svg`
                    if (key > 0) {
                        let min;
                        let max;
                        switch (degreeType) {
                            case DEGREESTYPES.celsius:
                                min = atributo.min_temp
                                min = min.toFixed(0) + 'ºC'
                                max = atributo.max_temp
                                max = max.toFixed(0) + 'ºC'
                                break;
                            case DEGREESTYPES.fahrenheit:
                                min = (atributo.min_temp * 9 / 5) + 32
                                min = min.toFixed(0) + 'ºF'
                                max = (atributo.max_temp * 9 / 5) + 32
                                max = max.toFixed(0) + 'ºF'
                                break
                            default:
                                min = atributo.min_temp
                                max = atributo.max_temp
                                break;
                        }
                        return <HighlightBlock date={atributo.applicable_date.substr(5, 9)} icon={icon} minTime={min} maxTime={max} />
                    }
                })
            )
        }
    }

    if (weather !== undefined) {
        return (
            <div className="rightBar">
                <div className="containerRightBar">
                    <header className="degreeButtons">
                        <DegreeButton content="ºC" onClick={() => setDegreeType(DEGREESTYPES.celsius)} />
                        <DegreeButton content="ºF" onClick={() => setDegreeType(DEGREESTYPES.fahrenheit)} />
                    </header>
                    <div className="highlightsContainer">
                        {renderHighlightsBlock()}
                    </div>
                    <TodayHighlights />
                </div>
            </div>
        )
    } else {
        return ""
    }
}
