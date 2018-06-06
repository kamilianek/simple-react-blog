/**
 * Created by kamilianek on 28.04.18.
 */
import jwt_decode from 'jwt-decode';

export function didLogin(token) {
  const userDetails = jwt_decode(token);
  return {
    type: 'LOGIN_FINISHED',
    token,
    userDetails,
  };
}

export function didLogout() {
  console.log('logout...');
  return {
    type: 'LOGOUT_FINISHED',
  };
}

export function followUser(newFollowedUser) {
  return {
    type: 'FOLLOW_USER',
    newFollowedUser,
  };
}

export default {
  didLogin,
  didLogout,
  followUser,
};
