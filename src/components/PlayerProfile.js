import React from 'react';
import '../style/PlayerProfile.css';

var key = require('../Key.js');

// part of the profile component that displays summoner name, icon, level, etc
// props contains the summoner json
class PlayerProfile extends React.Component {

    // retrieves the icon url for a given profile icon id
    getIcon = (id) => {
        return `http://ddragon.leagueoflegends.com/cdn/${key.GAME_VERSION}/img/profileicon/${id}.png`;
    }

    render() {
        const region = this.props.regionName;
        const summonerName = this.props.name;
        const summonerLevel = this.props.summonerLevel;
        const profileIconId = this.props.profileIconId;
        const revisionDate = this.props.revisionDate;
        const date = new Date(revisionDate).toLocaleString();

        // encoded url to op.gg profile
        var opgg = `https://${region}.op.gg/summoner/userName=${encodeURIComponent(summonerName)}`;
        if (region === 'KR') {
            opgg = `https://www.op.gg/summoner/userName=${encodeURIComponent(summonerName)}`;
        }

        return (
            <div className="profile">
                <div className="row header">
                    <div className="col-xs-1">
                        <img className="img-circle" src={this.getIcon(profileIconId)} alt={profileIconId}
                            width="100px" height="100px" />
                    </div>
                    <div className="col-xs-8">
                        <div className="playerInfo">
                            <p id="summonerName"><b>{'(' + region + ') ' + summonerName}</b></p>
                            <p id="summonerLevel">Level: {summonerLevel}</p>
                            <p id="lastActive">Last active: {date}</p>
                        </div>
                    </div>
                    <div className="col-xs-3">
                        <a id="opgg" href={opgg} target="_blank">
                            <img src={window.location.origin + '/images/opgg.png'} alt="op.gg" 
                                width="96px" height="24px" />
                        </a>
                    </div>
                </div>
                <hr />
            </div>
        );
    }

}

export default PlayerProfile;
