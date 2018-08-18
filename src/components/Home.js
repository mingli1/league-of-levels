import React from 'react';
import Header from './Header';
import Search from './Search';
import '../style/Home.css';

// the home page of the app containing the search bar and a nav bar
class Home extends React.Component {

    render() {
        return (
            <div>
                <Header showSearch={false} />
                <Search home={true} />
            </div>
        );
    }

}

export default Home;
