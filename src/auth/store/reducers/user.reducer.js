import * as Actions from "auth/store/actions";

const initialState = {
  role: "guest",
  data: {
    displayName: "Guest",
    avatarURL: "http://i.pravatar.cc/128",
    email: "test@test.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"]
  }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...state,
        ...action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...state
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default user;
