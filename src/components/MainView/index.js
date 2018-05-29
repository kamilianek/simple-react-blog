import React from 'react';
import { Menu, MenuItem } from 'react-foundation';

class MainView extends React.Component {
  render() {
    return (
      <div className="home-view-container">
        <div className="menu-active-state-example">
          <Menu>
            <MenuItem isActive><a>Strona główna</a></MenuItem>
            <MenuItem><a>Mój blog</a></MenuItem>
            <MenuItem><a>Moi przyjaciele</a></MenuItem>
            <MenuItem><a>Konto</a></MenuItem>
            <MenuItem><a>Wyloguj</a></MenuItem>
          </Menu>
        </div>
        <div>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default MainView;

