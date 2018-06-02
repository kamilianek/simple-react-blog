/**
 * Created by kamilianek on 28.04.18.
 */

const INITIAL_STATE = {
  data: null,
  token: null,
  userDetails: null,
  followed: [],
  apiUrl: 'https://intense-hamlet-87801.herokuapp.com/api',
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'LOGIN_FINISHED':
      return {
        ...state,
        token: action.token,
        userDetails: action.userDetails,
      };
    case 'LOGOUT_FINISHED':
      return {
        ...state,
        token: null,
        userDetails: null,
      };
    case 'FOLLOW_USER':
      return {
        ...state,
        followed: [...state.followed, action.newFollowedUser],
      };
    default:
      return state;
  }
}
