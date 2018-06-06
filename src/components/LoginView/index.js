/* eslint-disable func-names */
/**
 * Created by kamilianek on 28.04.18.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button, Colors, Sizes } from 'react-foundation';
import 'isomorphic-fetch';
import { withAlert } from 'react-alert';
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
        appId: '164788700874989',
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
        fetch(`${apiUrl}/auth/facebook`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: result.authResponse.accessToken,
          }),
        })
          .then(res => res.json())
          .then((res) => {
            if (res.status === 404) {
              this.props.alert.error('Error while login with this account, try again :(', { timeout: 5000 });
            }
            this.props.didLogin(res.data);
            this.props.alert.success('Login successful :)');
          }).catch(err => this.props.alert.error(err, { timeout: 5000 }));
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
          onClick={this.fbLogin}
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

export default withAlert(connect(mapSateToProps, mapDispatchToProps)(LoginView));
