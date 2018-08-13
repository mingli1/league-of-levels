import React from 'react';

var key = require('../Key.js');

// champion id to champion name mapping
const champions = require('../data/Champions.js');
// champion id to champion key mapping
const champKeys = require('../data/ChampionKeys.js');

// represents a table that displays champion mastery data
class Mastery extends React.Component {

    render() {
        // display total champ mastery on top of table
        var totalChampMastery = 0;
        if (this.props.totalMastery != null) totalChampMastery = this.props.totalMastery;

        return (
            <div>
                <p>Total champion mastery level: {totalChampMastery}</p>

                <table width="100%">
                    <tbody>
                        <tr>
                            <th>Champion</th>
                            <th>Mastery Level</th>
                            <th>Chest Granted</th>
                            <th>Total Points</th>
                            <th>Points to Next Level</th>
                            <th>Tokens</th>
                            <th>Last Played</th>
                        </tr>
                        {this.props.masteryJson == null ? null : 
                            (this.props.masteryJson.map(function (champion, index) {
                                const champName = 
                                    <p><img src={`http://ddragon.leagueoflegends.com/cdn/${key.GAME_VERSION}/img/champion/${champKeys.keys[champion.championId]}.png`}
                                            alt={champion.championId}
                                            width="24px" height="24px" />
                                        {champions.champs[champion.championId]}
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
                                        <td>{champName}</td>
                                        <td>{champion.championLevel}</td>
                                        <td>{chest}</td>
                                        <td>{champion.championPoints.toLocaleString()}</td>
                                        <td>{pointsToNextLevel}</td>
                                        <td>{tokens}</td>
                                        <td>{new Date(champion.lastPlayTime).toLocaleString()}</td>
                                    </tr>
                                );
                            }))
                        }
                    </tbody>
                </table>
                
                <p>Note: Champions not displayed have not been played by this summoner.</p>
            </div>
        );
    }

}

export default Mastery;
