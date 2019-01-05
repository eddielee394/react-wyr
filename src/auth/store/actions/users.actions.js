import { API } from "utils";

export const GET_ALL_USERS = "[USERS] GET ALL";

export function getAllUsers() {
  const request = API.getUsers();
  return (dispatch, getState) => {
    request.then(response => {
      console.log(response);
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data
      });
    });
  };
}
