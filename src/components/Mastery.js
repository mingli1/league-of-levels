import React from 'react';
import '../style/Mastery.css';

var key = require('../Key.js');

// champion id to champion name mapping
const champions = require('../data/Champions.js');
// champion id to champion key mapping
const champKeys = require('../data/ChampionKeys.js');

// represents a table that displays champion mastery data
class Mastery extends React.Component {

    state = {
        initialData: undefined,
        // a copy of the masteryJson data
        data: undefined,
        // object for storing how to sort (-1 - desc, 0 - none, 1 - asc)
        sortOrder: {
            index: 0,
            championName: 0,
            championLevel: 0,
            chestGranted: 0,
            championPoints: -1,
            championPointsSinceLastLevel: 0,
            tokensEarned: 0,
            lastPlayTime: 0
        }
    }

    componentDidMount = () => {
        // copy mastery array into state
        var masteryCopy =  [...this.props.masteryJson];
        // add champion name and index to each champion object
        for (var i = 0; i < masteryCopy.length; i++) {
            masteryCopy[i]['index'] = i + 1;
            masteryCopy[i]['championName'] = champions.champs[masteryCopy[i].championId];
        }
        this.setState({ 
            data: masteryCopy,
            initialData: masteryCopy
        });
    }

    // compare function sorting by descending
    compareDesc = (key) => {
        return function (a, b) {
            if (a[key] > b[key]) return -1;
            if (a[key] < b[key]) return 1;
            return 0;
        };
    }

    // sorts the data array in state either by ascending or descending
    sort = (key) => {
        var sortOrderCopy = {...this.state.sortOrder};

        // check if column is already selected to sort by either asc or desc
        if (sortOrderCopy[key] !== 0) {
            if (sortOrderCopy[key] === 1) sortOrderCopy[key] = -1;
            else sortOrderCopy[key] = 1;

            // sorting is reversed
            let sorted = this.state.data.reverse();
            this.setState({ 
                data: sorted,
                sortOrder: sortOrderCopy
            });
        }
        // if clicked on a "new" column then reset all others to 0 and set that column to desc
        else {
            for (var col in sortOrderCopy) {
                sortOrderCopy[col] = 0;
            }
            sortOrderCopy[key] = -1;

            let arrayCopy = [...this.state.data];
            arrayCopy.sort(this.compareDesc(key));
            this.setState({
                data: arrayCopy,
                sortOrder: sortOrderCopy
            });
        }
    }

    // search filter by champion name updated as champSearch changes
    search = (event) => {
        event.preventDefault();

        var sortOrderCopy = {...this.state.sortOrder};
        for (var col in sortOrderCopy) {
            sortOrderCopy[col] = 0;
        }
        sortOrderCopy['championPoints'] = -1;
        this.setState({ sortOrder: sortOrderCopy });

        var query = event.target.value.trim().toLowerCase();
        var arrayCopy = [];
        for (var i = 0; i < this.state.initialData.length; i++) {
            var champName = this.state.initialData[i]['championName'].toLowerCase();
            if (champName.startsWith(query)) {
                arrayCopy.push({...this.state.initialData[i]});
            }
        }
        this.setState({ data: arrayCopy });
    }

    // returns the sorting icon next to the column header depending on sort status
    getSortIcon = (key) => {
        if (this.state.sortOrder[key] === 0) 
            return <i className="material-icons">unfold_more</i>;
        else if (this.state.sortOrder[key] === -1) 
            return <i className="material-icons">expand_more</i>;
        else if (this.state.sortOrder[key] === 1) 
            return <i className="material-icons">expand_less</i>;
        return null;
    }

    render() {
        return (
            <div>
                <p>Total champion mastery level: {this.props.totalMastery}</p>
                <input type="text" 
                    placeholder="Search for champion..." 
                    name="champSearch" 
                    onChange={this.search}
                />

                {this.state.data == null ? null : 
                    (<div className="table-responsive">
                        <table className="table-striped" width="100%">
                        <tbody>
                            <tr>
                                <th onClick={() => this.sort('index')}>
                                    #{this.getSortIcon('index')}
                                </th>
                                <th onClick={() => this.sort('championName')}>
                                    Champion{this.getSortIcon('championName')}
                                </th>
                                <th onClick={() => this.sort('championLevel')}>
                                    Mastery Level{this.getSortIcon('championLevel')}
                                </th>
                                <th onClick={() => this.sort('chestGranted')}>
                                    Chest Granted{this.getSortIcon('chestGranted')}
                                </th>
                                <th onClick={() => this.sort('championPoints')}>
                                    Total Points{this.getSortIcon('championPoints')}
                                </th>
                                <th onClick={() => this.sort('championPointsSinceLastLevel')}>
                                    Points to Next Level{this.getSortIcon('championPointsSinceLastLevel')}
                                </th>
                                <th onClick={() => this.sort('tokensEarned')}>
                                    Tokens{this.getSortIcon('tokensEarned')}
                                </th>
                                <th onClick={() => this.sort('lastPlayTime')}>
                                    Last Played{this.getSortIcon('lastPlayTime')}
                                </th>
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
                    </table>
                    </div>)}

                <p>Note: Champions not displayed have not been played by this summoner.</p>
            </div>
        );
    }

}

export default Mastery;
