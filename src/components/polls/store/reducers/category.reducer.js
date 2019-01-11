import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: {}
};

const categoryReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_CATEGORY: {
      return {
        ...state,
        data: { ...action.category }
      };
    }
    default: {
      return state;
    }
  }
};

export default categoryReducer;
