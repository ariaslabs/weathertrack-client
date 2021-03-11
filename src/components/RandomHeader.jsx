import React, { Component } from 'react'

export default class RandomHeader extends Component{
    constructor() {
        super();

        this.state = {
            header: '',
            headers: [
                "天気予報",
                "天气预报",
                "Weather Forcast",
                "Previsioni Del Tempo",
                "Pronóstico Del Tiempo",
                "Väderprognos",
                "Hava Durumu Tahmini",
                "Wettervorhersage"
            ]
        }

        this.randomizer = this.randomizer.bind(this)
    }

    componentDidMount(){
        this.randomizer();
    }

    randomizer() {
        const randomNum = Math.floor(Math.random() * this.state.headers.length)
        this.setState({header: this.state.headers[randomNum]})
    }   
    
    render() {
        return (
            <div>
                <h1 className="headerTitle">{ this.state.header }</h1>
            </div>
        )
    }
}