import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function City() {
    const [state, setState] = useState({
        _id: useLocation().pathname.split('/')[2],
        city: '',
        state: '',
        lat: 0,
        lng: 0,
        currentTemp: 0, 
        tempIcon: '',
        shortForecast: ''
    })

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }

    async function getCityDetails() {
        const configs = {
            "headers": {
                'User-Agent': 'weathercheck.ariaslabs.com, ariaslabs@gmail.com'
            }
        }

        const cityResults = await axios.get(`http://weathertrack.ariaslabs.com:5000/api/v1/city?_id=${state._id}`).then(res => res.data)
        const weatherResults = await axios.get(`https://api.weather.gov/points/${cityResults.lat},${cityResults.lng}/forecast/hourly`, configs)
            .then(res => res.data)
        setState({
            state: state._id,
            city: cityResults.city,
            state:cityResults.state,
            lat: cityResults.lat,
            lng: cityResults.lng,
            currentTemp: weatherResults.properties.periods[0].temperature,
            tempIcon: weatherResults.properties.periods[0].icon,
            shortForecast: weatherResults.properties.periods[0].shortForecast
        }); 
    }
    getCityDetails()


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
        </div>
    )
}