/**
 * Created by kamilianek on 28.04.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem, Sizes, Callout, Colors } from 'react-foundation';

class LoginView extends React.Component {
  render() {
    return (
      <div className="home-view-container">
        <div className="menu-active-state-example">
          <Menu>
            <MenuItem isActive><a>Strona główna</a></MenuItem>
            <MenuItem><a>Mój blog</a></MenuItem>
            <MenuItem><a>Konto</a></MenuItem>
          </Menu>
        </div>
        <div className="callout-sizes-example">
          <Callout color={Colors.SUCCESS} size={Sizes.LARGE}>
            <h5>{`Witaj ${this.props.username} na prostym blogu!`}</h5>
            <p>Teraz możesz przeglądać blogi innych użytkowników</p>
          </Callout>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  username: state.user.userDetails.email,
});

export default connect(mapSateToProps, null)(LoginView);
