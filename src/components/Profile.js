import React from 'react';
import PlayerProfile from './PlayerProfile';
import Mastery from './Mastery';

// api key
const key = require('../Key.js');

// cors proxy
const proxy = 'https://cors-anywhere.herokuapp.com/';

// returns a json containing data from an API call
async function get(url) {
    const response = await fetch(url);
    return response.json();
}

// represents the summoner profile page that displays summoner info and champion masteries
// also makes initial calls to the LoL API to retrieve data when the component is loaded
class Profile extends React.Component {

    state = {
        // data from api in json form
        summonerJson: undefined,
        masteryJson: undefined,
        totalMastery: undefined,
        // the abbreviated region name, not the region host code for op.gg link
        regionName: 'NA'
    }

    // returns the region name from region host code
    getRegionName = (host) => {
        if (host === 'na1') return 'NA';
        if (host === 'br1') return 'BR';
        if (host === 'euw1') return 'EUW';
        if (host === 'eun1') return 'EUNE';
        if (host === 'kr') return 'KR';
        return host;
    }

    // performs a call to the LoL API to search for summoners by summoner name
    // and retrieve champion mastery data 
    componentDidMount = async () => {
        // getting region code and summoner name from the url
        const raw = this.props.match.params.sid;
        const data = raw.split('-');
        const regionHost = data[0];
        const summonerName = data[1];

        this.setState({ regionName: this.getRegionName(regionHost) })

        // API call for retrieving summoner info
        const summonerJson = await get(`${proxy}https://${regionHost}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${key.API_KEY}`);
        this.setState({ summonerJson: summonerJson });

        // API call for total summoner mastery
        const totalMasteryJson = await get(`${proxy}https://${regionHost}.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/${summonerJson.id}?api_key=${key.API_KEY}`);
        this.setState({ totalMastery: totalMasteryJson });

        // API call for champion mastery data
        const masteryJson = await get(`${proxy}https://${regionHost}.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerJson.id}?api_key=${key.API_KEY}`);
        this.setState({ masteryJson: masteryJson });
    }

    render() {
        return (
            <div>
                <PlayerProfile {...this.state.summonerJson} regionName={this.state.regionName} />
                <Mastery masteryJson={this.state.masteryJson} totalMastery={this.state.totalMastery} />
            </div>
        );
    }

}

export default Profile;
