import * as Actions from "../actions";

const initialState = {
  data: {},
  routeParams: {}
};
/**
 * question reducer
 * @param state
 * @param action PARAM_1 | PARAM_2 | PARAM_3
 * @return {{}}
 */
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_QUESTION_SUCCESS:
      return {
        //receive the state
        ...state,
        //merge the action
        data: action.payload,
        routeParams: action.config.params
      };
    case Actions.GET_QUESTION_FAILURE:
      return {
        ...state,
        data: null,
        routeParams: initialState.routeParams
      };
    default:
      return state;
  }
};

export default questionReducer;
