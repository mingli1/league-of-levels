import React from 'react';

// api key
const key = require('../Key.js');

// cors proxy
const proxy = 'https://cors-anywhere.herokuapp.com/';

// returns a json containing data from an API call
async function get(url) {
    const response = await fetch(url);
    return response.json();
}

// a search component that contains a selection of regions and inut for summoner name
class Search extends React.Component {

    state = {
        // region host for api call
        region: 'na1',
        // summoner attributes to display
        summonerId: undefined,
        summonerName: undefined,
        profileIconId: undefined,
        revisionDate: undefined,
        summonerLevel: undefined,

    }

    // updates the region selected
    handleSelectChange = (event) => {
        event.preventDefault();
        this.setState({ region: event.target.value });
    }

    // performs a call to the LoL API to search for summoners by summoner name
    getSummonerData = async (event) => {
        event.preventDefault();

        // summoner name from input box
        const summonerName = event.target.elements.summonerSearch.value.trim();
        // region the summoner is in
        const regionHost = this.state.region;

        // API call for retrieving summoner info
        const summonerJson = await get(`${proxy}https://${regionHost}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${key.API_KEY}`);
        console.log(summonerJson);

        // record summoner data
        this.setState({
            summonerId: summonerJson.id,
            summonerName: summonerJson.name,
            profileIconId: summonerJson.profileIconId,
            revisionDate: summonerJson.revisionDate,
            summonerLevel: summonerJson.summonerLevel
        });
    }

    render() {
        return (
            <div>
                <h3>Search for Summoner:</h3>
                <form onSubmit={this.getSummonerData}>
                    <select id="regionSelect" onChange={this.handleSelectChange}>
                        <option value="na1">NA</option>
                        <option value="euw1">EUW</option>
                        <option value="kr">KR</option>
                        <option value="eun1">EUNE</option>
                        <option value="br1">BR</option>
                    </select>
                    <input type="text" name="summonerSearch" placeholder="Enter a summoner name..."/>
                    <button>Search</button>
                </form>
            </div>
        );
    }

}

export default Search;
