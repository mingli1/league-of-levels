import React from 'react';

var key = require('../Key.js');

// champion id to champion name mapping
const champions = require('../data/Champions.js');
// champion id to champion key mapping
const champKeys = require('../data/ChampionKeys.js');

// represents a table that displays champion mastery data
class Mastery extends React.Component {

    state = {
        // a copy of the masteryJson data
        data: undefined
    }

    componentDidMount = () => {
        // copy mastery array into state
        var masteryCopy =  [...this.props.masteryJson];
        // add champion name and index to each champion object
        for (var i = 0; i < masteryCopy.length; i++) {
            masteryCopy[i]['index'] = i + 1;
            masteryCopy[i]['championName'] = champions.champs[masteryCopy[i].championId];
        }
        this.setState({ data: masteryCopy });
    }

    // compare function sorting by descending
    compareDesc = (key) => {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    // compare function sorting by ascending 
    compareAsc = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    }

    // sorts the data array in state either by ascending or descending
    sort = (key) => {
        let arrayCopy = [...this.state.data];
        arrayCopy.sort(this.compareDesc(key));
        this.setState({ data: arrayCopy });
    }

    render() {
        return (
            <div>
                <p>Total champion mastery level: {this.props.totalMastery}</p>

                {this.state.data == null ? null : 
                    (<table width="100%">
                        <tbody>
                            <tr>
                                <th onClick={() => this.sort('index')}>#</th>
                                <th onClick={() => this.sort('championName')}>Champion</th>
                                <th onClick={() => this.sort('championLevel')}>Mastery Level</th>
                                <th onClick={() => this.sort('chestGranted')}>Chest Granted</th>
                                <th onClick={() => this.sort('championPoints')}>Total Points</th>
                                <th onClick={() => this.sort('championPointsSinceLastLevel')}>Points to Next Level</th>
                                <th onClick={() => this.sort('tokensEarned')}>Tokens</th>
                                <th onClick={() => this.sort('lastPlayTime')}>Last Played</th>
                            </tr>

                            {this.state.data.map(function (champion, index) {
                                const champName = 
                                    <p><img src={`http://ddragon.leagueoflegends.com/cdn/${key.GAME_VERSION}/img/champion/${champKeys.keys[champion.championId]}.png`}
                                            alt={champion.championId}
                                            width="24px" height="24px" />
                                        {champion.championName}
                                    </p>;
                                const chest = champion.chestGranted ?
                                    (<img src={window.location.origin + '/images/chest.png'} 
                                        alt="hextech chest"
                                        width="32px" height="32px" />) : null;
                                const pointsToNextLevel = (champion.championLevel >= 5) ?
                                    'Max Level' : 
                                    (champion.championPointsSinceLastLevel.toLocaleString() + ' / ' + 
                                        (champion.championPointsSinceLastLevel + 
                                         champion.championPointsUntilNextLevel).toLocaleString());

                                var tokens = champion.tokensEarned;
                                if (champion.championLevel < 5) tokens = 'N/A';
                                else if (champion.championLevel === 5) tokens += ' / 2';
                                else if (champion.championLevel === 6) tokens += ' / 3';
                                else tokens = 'Max';

                                return (
                                    <tr key={index}>
                                        <td>{champion.index}</td>
                                        <td>{champName}</td>
                                        <td>{champion.championLevel}</td>
                                        <td>{chest}</td>
                                        <td>{champion.championPoints.toLocaleString()}</td>
                                        <td>{pointsToNextLevel}</td>
                                        <td>{tokens}</td>
                                        <td>{new Date(champion.lastPlayTime).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>)}

                <p>Note: Champions not displayed have not been played by this summoner.</p>
            </div>
        );
    }

}

export default Mastery;
