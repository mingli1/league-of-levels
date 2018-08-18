import React from 'react';
import Header from './Header';
import Search from './Search';
import '../style/Home.css';

// the home page of the app containing the search bar and a nav bar
class Home extends React.Component {

    componentDidMount = () => {
        document.title = 'League of Levels';
    }

    render() {
        return (
            <div>
                <Header showSearch={false} />
                <Search home={true} />
                <div className="title">
                    <h1 id="large-header">Find champion mastery data</h1>
                    <h4 id="sub-header">Look up a summoner name and get information about their champions</h4>
                </div>
            </div>
        );
    }

}

export default Home;
