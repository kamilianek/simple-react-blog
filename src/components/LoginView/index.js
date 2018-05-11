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


const FACEBOOK_APP_ID = '199818057408816';

class LoginView extends React.Component {
  static propTypes = {
    // From mapStateToProps:
    didLogin: PropTypes.func.isRequired,
    apiUrl: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.fbLogin = this.fbLogin.bind(this);
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
        fetch(`${apiUrl}/api/auth/facebook`, {
          method: 'POST',
          headers: {
            'x-auth-token': result.authResponse.token,
          },
        }).then((res) => {
          if (res.status === 404) {
            alert('Error while login with this account, try again :(');
          }
          console.log(res);
          this.props.didLogin('mock_token', 'mock_role');
        }).catch(alert);
      } else {
        alert('Error: no auth response');
      }
    });
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

export default connect(mapSateToProps, mapDispatchToProps)(LoginView);
