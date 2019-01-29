import { CALL_API } from "app/middleware/api";
import { API, Schemas } from "app/utils";

export const GET_CATEGORIES = "[POLLS] GET CATEGORIES";
export const GET_CATEGORIES_SUCCESS = "[POLLS] GET CATEGORIES SUCCESS";
export const GET_CATEGORIES_FAILURE = "[POLLS] GET CATEGORIES FAILURE";

export const getCategories = () => dispatch => {
  return dispatch({
    [CALL_API]: {
      types: [GET_CATEGORIES, GET_CATEGORIES_SUCCESS, GET_CATEGORIES_FAILURE],
      endpoint: API.fetchCategories(),
      method: "GET",
      schema: Schemas.categoriesList
    }
  });
};
