import * as Actions from "app/auth/store/actions";

const initialState = {
  success: false,
  error: {
    username: null,
    password: null
  }
};

const register = function(state = initialState, action) {
  switch (action.type) {
    case Actions.REGISTER_SUCCESS: {
      return {
        ...state,
        success: true
      };
    }
    case Actions.REGISTER_FAILURE: {
      return {
        success: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default register;
