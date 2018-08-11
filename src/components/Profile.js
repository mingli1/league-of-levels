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

// represents the summoner profile page that displays summoner info and champion masteries
// also makes initial calls to the LoL API to retrieve data when the component is loaded
class Profile extends React.Component {

    state = {
        // summoner attributes
        summonerId: undefined,
        summonerName: undefined,
        profileIconId: undefined,
        revisionDate: undefined,
        summonerLevel: undefined
    }

    // performs a call to the LoL API to search for summoners by summoner name
    componentDidMount = async () => {
        // getting region code and summoner name from the url
        const raw = this.props.match.params.sid;
        const data = raw.split('-');
        const regionHost = data[0];
        const summonerName = data[1];

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

    // retrieves the icon url for a given profile icon id
    getIcon = (id) => {
        return `http://ddragon.leagueoflegends.com/cdn/${key.GAME_VERSION}/img/profileicon/${id}.png`;
    }

    render() {
        return (
            <div>
                <h3>{this.state.summonerName}</h3>
                <h4>ID: {this.state.summonerId}</h4>
                <p>Level: {this.state.summonerLevel}</p>
                <p>Profile icon:
                    <img src={this.getIcon(this.state.profileIconId)} alt={this.state.profileIconId} />
                </p>
                <p>Time since last active: {this.state.revisionDate}</p>
            </div>
        );
    }

}

export default Profile;
