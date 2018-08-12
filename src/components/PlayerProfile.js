import React from 'react';

const key = require('../Key.js');

// part of the profile component that displays summoner name, icon, level, etc
// props contains the summoner json
class PlayerProfile extends React.Component {

    // retrieves the icon url for a given profile icon id
    getIcon = (id) => {
        return `http://ddragon.leagueoflegends.com/cdn/${key.GAME_VERSION}/img/profileicon/${id}.png`;
    }

    render() {
        const summonerName = this.props.name;
        const summonerLevel = this.props.summonerLevel;
        const profileIconId = this.props.profileIconId;
        const revisionDate = this.props.revisionDate;
        const date = new Date(revisionDate).toLocaleString();

        // encoded url to op.gg profile
        var opgg = `https://${this.props.regionName}.op.gg/summoner/userName=${encodeURIComponent(summonerName)}`;
        if (this.props.regionName === 'kr') {
            opgg = `https://www.op.gg/summoner/userName=${encodeURIComponent(summonerName)}`;
        }

        return (
            <div>
                <img src={this.getIcon(profileIconId)} alt={profileIconId}
                    width="100px" height="100px" />
                <p>{summonerName}</p>
                <p>Level: {summonerLevel}</p>
                <p>Last active: {date}</p>
                <a href={opgg} target="_blank">op.gg</a>
            </div>
        );
    }

}

export default PlayerProfile;
