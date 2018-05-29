/* eslint-disable func-names */
/**
 * Created by kamilianek on 28.04.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Colors, Sizes } from 'react-foundation';
import 'isomorphic-fetch';
import { PropTypes } from 'prop-types';
import './style.css';

import actions from '../../actions';


const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
const MOCK_TOKEN = process.env.REACT_APP_MOCK_TOKEN || '';

class LoginView extends React.Component {
  static propTypes = {
    // From mapStateToProps:
    didLogin: PropTypes.func.isRequired,
    apiUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.fbLogin = this.fbLogin.bind(this);
    this.mockLogin = this.mockLogin.bind(this);
  }

  componentDidMount() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = `https://connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v3.0&appId=${FACEBOOK_APP_ID}&autoLogAppEvents=1`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  fbLogin() {
    const { apiUrl } = this.props;
    window.FB.login((result) => {
      if (result.authResponse) {
        console.log(result.authResponse);
        fetch(`${apiUrl}/auth/facebook`, {
          method: 'POST',
          body: {
            access_token: result.authResponse.token,
          },
        }).then((res) => {
          if (res.status === 404) {
            alert('Error while login with this account, try again :(');
          }
          console.log(res);
          this.props.didLogin(res.token); // TODO: check how response looks like
        }).catch(alert);
      } else {
        alert('Error: no auth response');
      }
    }, { scope: 'public_profile,email' });
  }

  mockLogin() { // TODO: must be removed, login with mock token to avoid facebook login
    this.props.didLogin(MOCK_TOKEN);
  }

  render() {
    return (
      <div className="login-view-container">
        <h1>Explore simple react app!</h1>
        <h3>Login with facebook</h3>
        <Button
          color={Colors.PRIMARY}
          size={Sizes.LARGE}
          onClick={this.mockLogin}
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

const mapSateToProps = state => ({
  apiUrl: state.user.apiUrl,
});

export default connect(mapSateToProps, mapDispatchToProps)(LoginView);
