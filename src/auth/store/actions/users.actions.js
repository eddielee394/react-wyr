import axios from "axios";
import API from "utils/Api";

export const GET_ALL_USERS = "[USERS] GET ALL";

export function getAllUsers() {
  const request = axios.get("/api/users");
  const getUsers = new Promise((resolve, reject) => {
    axios.get("/api/users").then(response => {
      return response.data;
    });
  });

  console.log(getUsers);
  return (dispatch, getState) => {
    request.then(response => {
      console.log(response);
      dispatch({
        TYPE: GET_ALL_USERS,
        payload: response.data
      });
    });
  };
}
