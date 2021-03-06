import React from 'react';
import Search from './Search';
import '../style/Header.css';
import { Link } from 'react-router-dom';

// header that appears at the top of page containing the logo, name, search bar, links, etc
// also acts as a nav bar to return to the home page or profile pages
class Header extends React.Component {

    render() {
        return (
            <div className="bar">
                <Link to={{ pathname: '/' }}>
                    <div className="logo">
                        <img src={window.location.origin + '/images/logo.png'} alt="logo" 
                            className="img-rounded" width="45px" height="45px" />
                        League of Levels
                    </div>
                </Link>
                {this.props.showSearch ? <Search /> : 
                    <div className="github">
                        <a className="gitlink" href="https://www.github.com/mingli1/league-of-levels" target="_blank">
                            <img src={window.location.origin + '/images/github.svg'} alt="github"
                                width="45px" height="45px" />
                            GitHub
                        </a>
                    </div>
                }
            </div>
        );
    }

}

export default Header;
