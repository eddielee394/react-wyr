export const GET_ALL_USERS = "[USERS] GET ALL";

export function getAllUsers(users) {
  return dispatch => {
    dispatch({
      type: GET_ALL_USERS,
      payload: users
    });
  };
}
