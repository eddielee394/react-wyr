import * as Actions from "app/auth/store/actions";

const initialState = [];

const users = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case Actions.STORE_USER_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case Actions.UPDATE_USERS_SUCCESS: {
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
