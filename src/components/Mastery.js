import React from 'react';

// champion id to champion name mapping
const champions = require('../data/Champions.js');

// represents a table that displays champion mastery data
class Mastery extends React.Component {

    render() {
        // display total champ mastery on top of table
        var totalChampMastery = 0;
        if (this.props.totalMastery != null) totalChampMastery = this.props.totalMastery;

        return (
            <div>
                <p>Total champion mastery level: {totalChampMastery}</p>

                {this.props.masteryJson == null ? null : (
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
                            {this.props.masteryJson.map(function (champion, index) {
                                return (
                                    <tr key={index}>
                                        <td>{champions.champs[champion.championId]}</td>
                                        <td>{champion.championLevel}</td>
                                        <td>{champion.chestGranted.toString()}</td>
                                        <td>{champion.championPoints}</td>
                                        <td>{champion.championPointsUntilNextLevel}</td>
                                        <td>{champion.tokensEarned}</td>
                                        <td>{new Date(champion.lastPlayTime).toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }

}

export default Mastery;
