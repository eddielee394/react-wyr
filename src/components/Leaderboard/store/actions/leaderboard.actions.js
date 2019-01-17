export const GET_USERS = "[LEADERBOARD] GET USERS";
export const SET_SEARCH_TEXT = "[LEADERBOARD] SET SEARCH TEXT";
export const GET_GLOBAL_RANK = "[LEADERBOARD] GET GLOBAL RANK";
export const GET_QUESTIONS_ANSWERED = "[LEADERBOARD] GET QUESTIONS ANSWERED";
export const GET_QUESTIONS_ASKED = "[LEADERBOARD] GET QUESTIONS ASKED";
export const GET_USERS_STATS = "[LEADERBOARD] GET USERS STATS";

export const getUsers = () => (dispatch, getState) => {
  const { users } = getState().auth;
  return dispatch({
    type: GET_USERS,
    payload: users
  });
};

export const setSearchText = event => ({
  type: SET_SEARCH_TEXT,
  searchText: event.target.value
});

export const getQuestionsAnswered = userId => {
  return {
    type: GET_QUESTIONS_ANSWERED,
    userId: userId
  };
};

export const getQuestionsAsked = userId => {
  return {
    type: GET_QUESTIONS_ASKED,
    userId: userId
  };
};

export const getGlobalRank = userId => dispatch => {
  return {
    type: GET_GLOBAL_RANK,
    userId: userId
  };
};

export const getUsersStats = () => dispatch => {
  return dispatch({
    type: GET_USERS_STATS
  });
};
