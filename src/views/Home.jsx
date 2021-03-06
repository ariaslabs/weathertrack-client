import React, { Component } from 'react'
import {
    Redirect    
  } from "react-router-dom";
import axios from 'axios'
import dotenv from  'dotenv'
import InfiniteScroll  from 'react-infinite-scroll-component'

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            searchResults: [],
            loading: false,
            page: 1,
            search: ''
        }
        this.search = this.search.bind(this)
    }

    toCity(_id) {        
        this.props.history(`/city/${_id}`)
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
     * 
     * @returns list of results
     */
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
            <ul>
                <InfiniteScroll
                next={async () => {
                    this.state.page++
                    const apiURL = process.env.REACT_APP_API_URL
                    let results = await axios.get(`${apiURL}/api/v1/search?search=${e.target.value}&page=${this.state.page}`)
                        .then(doc => doc.data)
                    return results
                }}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>No more to see...</b>
                    </p>
                  }
                loading={<span className="loading">LOADING...</span>}
                >{results}</InfiniteScroll>
            </ul>
        )
    }

    
    /**
     * Search event handler
     * @param {*}
     */
    async search(e) {
        if (e.key === 'Enter') {
        this.setState({loading: true});

        const apiURL = process.env.REACT_APP_API_URL

        console.log(apiURL)

        let results = await axios.get(`${apiURL}/api/v1/search?search=${e.target.value}&page=${this.state.page}`)
            .then(doc => doc.data)

            console.log(results)

        this.setState({
                searchResults: this.state.searchResults.concat(results.results),
                loading: false 
            });
        }
    }

    /**
     *  Main process
     */
    main() {
        return (
            <div className="container">
                {this.state.searchResults.length === 0 ? <p>No Results Found.</p> : this.displayResults() }
            </div>
        )   
    }

    /**
     * Loader
     */
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
  