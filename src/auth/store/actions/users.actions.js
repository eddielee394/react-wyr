import axios from "axios";
import API from "utils/Api";

export const GET_ALL_USERS = "[USERS] GET ALL";

export function getAllUsers() {
  const request = axios.get("/api/users");
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
