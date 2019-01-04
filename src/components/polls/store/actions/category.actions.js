import { showMessage } from "store/actions/fuse";
import { API, Schemas } from "utils";
import { CALL_API } from "middleware/api";

export const GET_CATEGORY = "[POLLS] GET CATEGORY";
export const GET_CATEGORY_SUCCESS = "[POLLS] GET CATEGORY SUCCESS";
export const GET_CATEGORY_FAILURE = "[POLLS] GET CATEGORY FAILURE";

export const getCategory = routeParams => ({
  [CALL_API]: {
    types: [GET_CATEGORY, GET_CATEGORY_SUCCESS, GET_CATEGORY_FAILURE],
    endpoint: API.fetchCategory(),
    method: "GET",
    schema: Schemas.categoriesList,
    params: routeParams
  }
});
