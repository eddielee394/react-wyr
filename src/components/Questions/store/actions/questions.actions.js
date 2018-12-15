import axios from "axios/index";

export const GET_QUESTIONS = "[QUESTIONS] GET QUESTIONS";
export const GET_CATEGORIES = "[QUESTIONS] GET CATEGORIES";
export const SET_QUESTIONS_SEARCH_TEXT =
  "[QUESTIONS] SET QUESTIONS SEARCH TEXT";
export const SET_QUESTIONS_CATEGORY_FILTER =
  "[QUESTIONS] SET QUESTIONS CATEGORY FILTER";

export function getQuestions() {
  const request = axios.get("/api/questions");

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_QUESTIONS,
        payload: response.data
      })
    );
}

export function getCategories() {
  const request = axios.get("/api/academy-app/categories");

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_CATEGORIES,
        payload: response.data
      })
    );
}

export function setQuestionsSearchText(event) {
  return {
    type: SET_QUESTIONS_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function setCategoryFilter(event) {
  return {
    type: SET_QUESTIONS_CATEGORY_FILTER,
    category: event.target.value
  };
}
