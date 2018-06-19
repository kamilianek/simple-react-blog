import React from 'react';
import { Menu, MenuItem } from 'react-foundation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions';

import './style.css';

class MainView extends React.Component {
  static propTypes = {
    didLogout: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }
  doLogout(e) {
    e.preventDefault();
    this.props.didLogout();
  }
  render() {
    return (
      <div className="home-view-container">
        <div className="menu-container">
          <div className="menu-active-state-example">
            <Menu>
              <MenuItem><a href="#/home">Strona główna</a></MenuItem>
              <MenuItem><a href="#/myBlog">Mój blog</a></MenuItem>
              <MenuItem><a href="#/friends">Moi przyjaciele</a></MenuItem>
              <MenuItem><a>Konto</a></MenuItem>
              <MenuItem><a href="#logout" onClick={this.doLogout}>Wyloguj</a></MenuItem>
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

const mapDispatchToProps = dispatch => bindActionCreators({
  didLogout: () => actions.user.didLogout(),
}, dispatch);

export default connect(null, mapDispatchToProps)(MainView);

