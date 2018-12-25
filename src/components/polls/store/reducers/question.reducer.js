import * as Actions from "../actions";

// const initialState = null;
const initialState = {};

const questionReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTION: {
      return {
        ...action.payload
      };
    }
    case Actions.SAVE_QUESTION: {
      return {
        ...action.payload
      };
    }
    case Actions.UPDATE_QUESTION: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default questionReducer;
