import React from 'react';
import Search from './Search';
import '../style/Header.css';

// header that appears at the top of page containing the logo, name, search bar, links, etc
// also acts as a nav bar to return to the home page or profile pages
class Header extends React.Component {

    render() {
        return (
            <div className="bar">
                <Search />
            </div>
        );
    }

}

export default Header;
