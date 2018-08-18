import React from 'react';

import PlayerProfile from './PlayerProfile';
import Mastery from './Mastery';
import Header from './Header';

import '../style/Profile.css';

// api key
var key = require('../Key.js');

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

    componentDidMount = () => {
        this.fetchData(this.props.match.params.sid);
    }

    // fetches the data when searching from a profile page rather than the home page
    componentWillReceiveProps = (nextProps) => {
        if (this.props.match.params.sid !== nextProps.match.params.sid) {
            this.setState({
                summonerJson: undefined,
                masteryJson: undefined,
                totalMastery: undefined
            });
            this.fetchData(nextProps.match.params.sid);
        }
    }

    // performs a call to the LoL API to search for summoners by summoner name
    fetchData = async (sid) => {
        // getting region code and summoner name from the url
        const data = sid.split('-');
        const regionHost = data[0];
        const summonerName = data[1];
        document.title = summonerName + ' - League of Levels';

        this.setState({ regionName: this.getRegionName(regionHost) })

        // API call for retrieving summoner info
        const summonerJson = await fetch(`${key.proxy}https://${regionHost}.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${key.API_KEY}`).then(response => response.json());
        this.setState({ summonerJson: summonerJson });
        // summoner not found
        if (this.state.summonerJson.status != null) {
            console.log(this.state.summonerJson.status);
            return;
        }

        // API call for total summoner mastery
        const totalMasteryJson = await fetch(`${key.proxy}https://${regionHost}.api.riotgames.com/lol/champion-mastery/v3/scores/by-summoner/${summonerJson.id}?api_key=${key.API_KEY}`).then(response => response.json());
        this.setState({ totalMastery: totalMasteryJson });

        // API call for champion mastery data
        const masteryJson = await fetch(`${key.proxy}https://${regionHost}.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerJson.id}?api_key=${key.API_KEY}`).then(response => response.json());
        this.setState({ masteryJson: masteryJson });
    }

    render() {
        return (
            <div>
                { (typeof this.state.summonerJson !== 'undefined' && 
                    typeof this.state.totalMastery !== 'undefined' &&
                    typeof this.state.masteryJson !== 'undefined') ? 
                        (
                        <div>
                            <div>
                                <Header showSearch={true} />
                            </div>
                            <div className="container">
                                <PlayerProfile {...this.state.summonerJson} regionName={this.state.regionName} />
                                <Mastery masteryJson={this.state.masteryJson} totalMastery={this.state.totalMastery} />
                            </div>
                        </div>
                        ) :
                        (this.state.summonerJson != null && this.state.summonerJson.status != null ? 
                            <div>
                                <Header showSearch={true} />
                                <div className="error">
                                    <h1>Error: Summoner could not be found.</h1>
                                    <h4>Did you enter the correct summoner name and region?</h4>
                                </div>
                            </div> :
                            <p id="loading">Fetching...</p> 
                        )
                }
            </div>
        );
    }

}

export default Profile;
