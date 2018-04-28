/**
 * Created by kamilianek on 28.04.18.
 */

const INITIAL_STATE = {
  data: null,
  token: null,
  role: null,
  apiUrl: 'http://localhost:8000',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_FINISHED':
      return {
        ...state,
        token: action.token,
        role: action.role,
      };
    case 'LOGOUT_FINISHED':
      return {
        ...state,
        token: null,
        role: null,
      };
    default:
      return state;
  }
}
