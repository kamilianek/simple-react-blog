/* eslint-disable func-names */
/**
 * Created by kamilianek on 28.04.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Colors, Sizes } from 'react-foundation';
import { PropTypes } from 'prop-types';
import './style.css';

import actions from '../../actions';


const FACEBOOK_APP_ID = '164788700874989';

class LoginView extends React.Component {
  static propTypes = {
    // From mapStateToProps:
    didLogin: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.doFacebookLogin = this.doFacebookLogin.bind(this);
  }
  doFacebookLogin() {
    console.log('doFacebookLogin');
    this.props.didLogin('token123'); // TODO: server
  }

  render() {
    return (
      <div className="login-view-container">
        <h1>Login with facebook</h1>
        <Button
          color={Colors.PRIMARY}
          size={Sizes.LARGE}
          onClick={this.doFacebookLogin}
        >
          Login!
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  didLogin: token => dispatch(actions.user.didLogin(token)),
});

export default connect(null, mapDispatchToProps)(LoginView);
