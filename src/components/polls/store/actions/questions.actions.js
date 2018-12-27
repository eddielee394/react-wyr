import axios from "axios/index";

export const GET_QUESTIONS = "[POLLS] GET QUESTIONS";
export const GET_CATEGORIES = "[POLLS] GET CATEGORIES";
export const GET_QUESTIONS_BY_CATEGORY = "[POLLS] GET QUESTIONS BY CATEGORY";
export const SET_QUESTIONS_SEARCH_TEXT = "[POLLS] SET QUESTIONS SEARCH TEXT";
export const SET_QUESTIONS_CATEGORY_FILTER =
  "[POLLS] SET QUESTIONS CATEGORY FILTER";

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
  const request = axios.get("/api/questions/categories");
  // console.log(request.then(response => response.data));
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

export function getQuestionsByCategory(params) {
  const request = axios.get("/api/questions", { params });
  console.log("getQuestionsByCategory: ", params);
  return dispatch => {
    request.then(response => {
      dispatch({
        type: GET_QUESTIONS_BY_CATEGORY,
        questions: response.data.questions,
        category: response.data.category
      });
    });
  };
}
