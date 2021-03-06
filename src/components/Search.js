import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Search.css'

// a search component that contains a selection of regions and input for summoner name
class Search extends React.Component {

    state = {
        // region host for api call
        region: 'na1',
        summonerName: undefined
    }

    // updates the region selected
    handleSelectChange = (event) => {
        event.preventDefault();
        this.setState({ region: event.target.value });
    }

    // updates the summoner name in the input box
    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({ summonerName: event.target.value.trim() });
    }

    render() {
        return (
            this.props.home ? 
            (
                <div className="searchHome">
                    <div className="form-group row">
                        <div className="col-xs-2">
                            <select className="form-control form-control-xs regionSelect" 
                                data-width="100%"
                                id="regionSelect" onChange={this.handleSelectChange}>
                                <option value="na1">NA</option>
                                <option value="euw1">EUW</option>
                                <option value="kr">KR</option>
                                <option value="eun1">EUNE</option>
                                <option value="br1">BR</option>
                            </select>
                        </div>

                        <div className="col-xs-7">
                            <input 
                                className="form-control searchSumm" 
                                type="text" 
                                placeholder="Search for summoner..." 
                                onChange={this.handleInputChange} 
                            />
                        </div>

                        <div className="col-xs-3">
                            <Link to={{ pathname: `/summoner/${this.state.region}-${this.state.summonerName}` }}>
                                <button type="button" className="btn btn-primary searchButton">Search</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) :
            (
                <div className="search">
                    <form className="form-inline">
                        <select className="form-control form-control-xs" 
                            data-width="100%"
                            id="regionSelect" onChange={this.handleSelectChange}>
                            <option value="na1">NA</option>
                            <option value="euw1">EUW</option>
                            <option value="kr">KR</option>
                            <option value="eun1">EUNE</option>
                            <option value="br1">BR</option>
                        </select>

                        <input 
                            className="form-control" 
                            type="text" 
                            placeholder="Search for summoner..." 
                            onChange={this.handleInputChange} 
                        />

                        <Link to={{ pathname: `/summoner/${this.state.region}-${this.state.summonerName}` }}>
                            <button type="button" className="btn btn-primary">Search</button>
                        </Link>
                    </form>
                </div>
            )
        );
    }

}

export default Search;
