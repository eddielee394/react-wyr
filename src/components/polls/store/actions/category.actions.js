import { showMessage } from "store/actions/fuse";
import { API } from "utils";
import { CALL_API } from "middleware/api";

export const GET_CATEGORY = "[POLLS] GET CATEGORY";

export function getCategory(params) {
  const request = API.getCategory(params);
  return dispatch =>
    request.then(response => {
      dispatch({
        type: GET_CATEGORY,
        payload: response.data
      });
    });
}
