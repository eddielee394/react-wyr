export const GET_USERS = "[LEADERBOARD] GET USERS";
export const SET_SEARCH_TEXT = "[LEADERBOARD] SET SEARCH TEXT";
export const GET_USERS_STATS = "[LEADERBOARD] GET USERS STATS";

export const getUsers = () => (dispatch, getState) => {
  const { users } = getState().auth;
  return dispatch({
    type: GET_USERS,
    payload: users
  });
};

export const getUsersStats = () => dispatch => {
  return dispatch({
    type: GET_USERS_STATS
  });
};
