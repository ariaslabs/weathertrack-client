import React, { Component } from 'react'
import {
    Redirect    
  } from "react-router-dom";
import axios from 'axios'
import RandomHeader from '../components/RandomHeader.jsx'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            page: 1,
            next: null,
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

        return (
            <div>
                {results}
                {this.state.next !== null ? <span>Loading...</span> : <span>Nothing More to show.</span>}
            </div>
        )
    }

  
    async search(e) {
        if (e.key === 'Enter') {
        this.setState({loading: true});

        const apiURL = process.env.REACT_APP_API_URL

        let results = await axios.get(`${apiURL}/api/v1/search?search=${e.target.value}`)
            .then(doc => doc.data)
        console.log(results)
        let nextPage = '';

        try {
            nextPage = results.next.page
        } catch(err) {
            nextPage = null
        }
    
        this.setState({
                search: e.target.value,
                searchResults: results.results,
                page: results.page,
                next: nextPage,  
                loading: false 
            });
        }
    }

     main() {
        return (
            <div className="container search-results">
                {this.state.searchResults.length === 0 ? <p>No Results Found.</p> : <ul>{this.displayResults()}</ul>}
            </div>
        )   
     }

    loading() {
        return (
            <div className="loading-container">
                <span className="loading">LOADING...</span>
            </div>
        )
    }
        

    render() {
        return (
            <>
                <div>
                    <header>
                        <div className="title-container">
                            <RandomHeader />
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
  