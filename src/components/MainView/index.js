import React from 'react';
import { Menu, MenuItem } from 'react-foundation';

import './style.css';

class MainView extends React.Component {
  render() {
    return (
      <div className="home-view-container">
        <div className="menu-container">
          <div className="menu-active-state-example">
            <Menu>
              <MenuItem><a>Strona główna</a></MenuItem>
              <MenuItem><a>Mój blog</a></MenuItem>
              <MenuItem><a href="#/friends">Moi przyjaciele</a></MenuItem>
              <MenuItem><a>Konto</a></MenuItem>
              <MenuItem><a>Wyloguj</a></MenuItem>
            </Menu>
          </div>
        </div>
        <div className="content">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default MainView;

