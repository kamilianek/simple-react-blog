export function changeUserToDisplay(userId, username) {
  return {
    type: 'CHANGE_USER_TO_DISPLAY',
    userId,
    username,
  };
}


export default {
  changeUserToDisplay,
};
