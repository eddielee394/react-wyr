import { CALL_API } from "middleware/api";
import { API, Schemas } from "utils";

export const GET_CATEGORY = "[POLLS] GET CATEGORY";
export const GET_CATEGORY_SUCCESS = "[POLLS] GET CATEGORY SUCCESS";
export const GET_CATEGORY_FAILURE = "[POLLS] GET CATEGORY FAILURE";

export const getCategory = routeParams => dispatch => {
  dispatch({
    [CALL_API]: {
      types: [GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE],
      endpoint: API.fetchCategory(),
      method: "GET",
      schema: Schemas.categoriesList,
      params: routeParams
    }
  });
};
