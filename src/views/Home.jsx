import React, { Component } from 'react'
import {
    Redirect    
  } from "react-router-dom";
import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            loading: false
        }
        this.search = this.search.bind(this)
    }

    toCity(_id) {        
        this.props.history(`/city/${_id}`)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    displayResults() {
        const results = this.state.searchResults.map(item => {
            return (
                <li className="search-result card" key={item._id} value={item._id} onClick={() => this.toCity(item._id)}>
                    <h4>{this.capitalizeFirstLetter(item.city)}</h4>
                    <span>{this.capitalizeFirstLetter(item.state)}</span>
                </li>
            )
        })

        return results
    }

  
    async search(e) {
        if (e.key === 'Enter') {
        this.setState({loading: true});
        let results = await axios.get(`http://127.0.0.1:5000/api/v1/search?search=${e.target.value}`)
            .then(doc => doc.data)
        this.setState({
                searchResults: results,
                loading: false 
            });
        }
    }

     main() {
        return (
            <div className="container">
                {this.state.searchResults.length === 0 ? <p>No Results Found.</p> : <ul>{this.displayResults()}</ul>}
            </div>
        )   
     }

    loading() {
        return (
            <div className="loading-container">
                <span className="loading">Loading...</span>
            </div>
        )
    }
        

    render() {
        return (
            <>
                <div>
                    <header>
                        <div className="title-container">
                            <h1 className="headerTitle">天気予報...</h1>
                        </div>
                        <div className="search-container">
                        <input type="text" placeholder='Search City...' onKeyDown={this.search} />
                        </div>
                    </header>
                    {this.state.loading ? this.loading() : this.main()}
                </div>
            </>
        )
    }

  }
  