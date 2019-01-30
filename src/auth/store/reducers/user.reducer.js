import imgAvatarDefault from "assets/images/avatars/profile.jpg";
import * as Actions from "auth/store/actions";

const initialState = {
  role: "guest",
  data: {
    displayName: "Guest",
    avatarURL: imgAvatarDefault,
    email: "test@test.com"
  }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA: {
      return {
        ...initialState,
        ...action.payload
      };
    }
    case Actions.REMOVE_USER_DATA: {
      return {
        ...initialState
      };
    }
    case Actions.USER_LOGGED_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
