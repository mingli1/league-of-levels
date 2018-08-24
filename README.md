# League of Levels
Check it out at https://leagueoflevels.herokuapp.com/

Inspired by Derpthemeus's [ChampionMasteryLookup](https://championmasterylookup.derpthemeus.com/) (check his site out it has more features than mine)
## About
League of Levels is a web app that displays player data from [League of Legends](https://na.leagueoflegends.com/en/), one of the most popular games in the world currently. Users are able to search for a player/summoner name and receive data about the player's champion masteries. The site uses the [Riot Games API](https://developer.riotgames.com/api-methods/) to fetch the information and displays it in a nice sortable, searchable table.

I made this project to practice and learn the [React](https://reactjs.org/) framework and web development in general. 

## Install
If you want to run this locally, you first need [node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). 

Clone this repository:

```bash
git clone https://github.com/mingli1/league-of-levels.git
cd league-of-levels
```

Install node dependencies:

```bash
npm install
```

Create a JavaScript file named `Key.js` in `/src` and inside write:

```javascript
module.exports = {
    API_KEY: '',
    GAME_VERSION: '',
    proxy: ''
}
```
`API_KEY` is your Riot Games API development key you can obtain from the Riot API website

`GAME_VERSION` is the current League of Legends patch (eg. `'8.15.1'`)

`proxy` is the CORS proxy (eg. `'https://cors-anywhere.herokuapp.com/'`)

Start the local server:
```bash
npm start
```
## Screenshots
![homepage](https://user-images.githubusercontent.com/29984767/44305408-96ecb900-a344-11e8-8c4b-8df5fe7423b4.png)
![profilepage](https://user-images.githubusercontent.com/29984767/44305412-99e7a980-a344-11e8-9b0c-528379022420.png)
