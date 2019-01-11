export const SET_CATEGORY_FILTER = "[POLLS] SET CATEGORY FILTER";
export const SET_SEARCH_TEXT = "[POLLS] SET SEARCH TEXT";

export function setCategoryFilter(event) {
  console.log("ACTIONS.setCategoryFilter: ", event);
  return dispatch => {
    dispatch({
      type: SET_CATEGORY_FILTER,
      payload: event.target.value
    });
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    payload: event.target.value
  };
}
