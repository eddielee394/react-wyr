import * as Actions from "app/auth/store/actions";
import imgAvatarDefault from "assets/images/avatars/profile.jpg";

const initialState = {
  id: "guest",
  from: "localStorage",
  role: "guest",
  data: {
    displayName: "Guest",
    avatarURL: imgAvatarDefault,
    email: "test@test.com"
  }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SET_USER_DATA_SUCCESS: {
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
    case Actions.LOGOUT_SUCCESS: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default user;
