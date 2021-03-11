import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function City() {
    const [state, setState] = useState({
        _id: '',
        city: '',
        state: '',
        lat: 0,
        lng: 0,
        currentTemp: 0, 
        tempIcon: '',
        shortForecast: '',
        weeklyForecast: []
    })

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    async function GetCityDetails() {
        const cityID = useLocation().pathname.split('/')[2]


        let weatherResults;
        let weeklyWeather

        const apiURL = process.env.REACT_APP_API_URL

        const cityResults = await axios.get(`${apiURL}/api/v1/city?_id=${cityID}`).then(res => res.data)
        try {
            weatherResults = await axios.get(`https://api.weather.gov/points/${cityResults.lat},${cityResults.lng}/forecast/hourly`)
            .then(res => res.data)
        } catch(err) {}

        try {
            weeklyWeather = await axios.get(`https://api.weather.gov/points/${cityResults.lat},${cityResults.lng}/forecast`)
            .then(res => res.data)
        } catch(err) {}
        
        const weeklyPayload = weeklyWeather.properties.periods.splice(1, 9)
        
        setState({
            cityID: cityID,
            city: cityResults.city,
            state:cityResults.state,
            lat: cityResults.lat,
            lng: cityResults.lng,
            currentTemp: weatherResults.properties.periods[0].temperature,
            tempIcon: weatherResults.properties.periods[0].icon,
            shortForecast: weatherResults.properties.periods[0].shortForecast,
            weeklyForecast: weeklyPayload
        }); 
    }
    GetCityDetails()


    function mainCard() {
        return (
            <div>
                <h3 className="city-name">{capitalize(state.city)}</h3>
                <h4 className="city-state">{capitalize(state.state)}</h4>
                <span className="coords">lat: {state.lat}, long: {state.lng}</span>
                <div className="img-container">
                    <div>
                        <img className="" src={state.tempIcon} alt={state.shortForecast} width="80px" />
                    </div>
                    <span className="short-forecast">{state.shortForecast}</span>
                </div>
                <div className="temp-container">
                    <br/>
                    <h3>{state.currentTemp} <span className="degree">°F</span></h3>
                </div>
            </div>
        )
    }

    function weeklyForcastCard() {
        const results = state.weeklyForecast.map(item => {
            if(item.name.split(" ")[1] !== "Night") {
                return (
                    <div className="weekly-weather-list" key={item.name}>
                        <h4>{item.name}</h4>
                        <span className="weekly-temp">{item.temperature}<span>°{item.temperatureUnit}</span></span>
                        <p>{item.detailedForecast}</p>
                    </div>
                )
            }
            
        })

        return results
    }

    function loading() {
        return (
            <div className="loading-container">
                <span className="loading">LOADING...</span>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="city-card">
                {state.city === '' ? loading() : mainCard()}
            </div>
            <div className="weekly-card">
                {state.city === '' ? loading() : weeklyForcastCard()}
            </div>
        </div>
    )
}