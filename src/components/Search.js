import React from 'react';
import { Link } from 'react-router-dom';

// a search component that contains a selection of regions and inut for summoner name
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
            <div>
                <h3>Search for Summoner:</h3>
                <form>
                    <select id="regionSelect" onChange={this.handleSelectChange}>
                        <option value="na1">NA</option>
                        <option value="euw1">EUW</option>
                        <option value="kr">KR</option>
                        <option value="eun1">EUNE</option>
                        <option value="br1">BR</option>
                    </select>

                    <input 
                        type="text" 
                        name="summonerSearch" 
                        placeholder="Enter a summoner name..." 
                        onChange={this.handleInputChange} 
                    />

                    <Link to={{ pathname: `/summoner/${this.state.region}-${this.state.summonerName}` }}>
                        <button>Search</button>
                    </Link>
                </form>
            </div>
        );
    }

}

export default Search;
