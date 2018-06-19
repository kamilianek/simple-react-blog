/**
 * Created by kamilianek on 20.06.18.
 */

const INITIAL_STATE = {
  userId: null,
  username: null,
};

export default function contentReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'CHANGE_USER_TO_DISPLAY':
      return {
        userId: action.userId,
        username: action.username,
      };
    default:
      return state;
  }
}
