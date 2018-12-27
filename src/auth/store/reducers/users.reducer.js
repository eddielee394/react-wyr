import * as Actions from "auth/store/actions";

const initialState = {};

const users = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS: {
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

export default users;
