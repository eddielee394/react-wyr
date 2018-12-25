import * as Actions from "auth/store/actions";

const users = function(state = [], action) {
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
