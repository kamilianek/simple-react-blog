/**
 * Created by kamilianek on 28.04.18.
 */
export function didLogin(token, role) {
  return {
    type: 'LOGIN_FINISHED',
    token,
    role,
  };
}

export function didLogout() {
  return {
    type: 'LOGOUT_FINISHED',
  };
}

export default {
  didLogin,
  didLogout,
};
