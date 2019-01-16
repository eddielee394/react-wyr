import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: {}
};

const categoryReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        data: { ...action.payload }
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;
