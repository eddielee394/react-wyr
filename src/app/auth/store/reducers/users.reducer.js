import _ from "@lodash";
import * as Actions from "app/auth/store/actions";

const initialState = {};

const users = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS_SUCCESS: {
      const users = _.cloneDeep(_.keyBy(action.payload, "id"));
      console.log("Actions.GET_ALL_USERS", action.payload, users);
      return {
        ...state,
        ...users
      };
    }
    case Actions.STORE_USER_SUCCESS: {
      const users = _.cloneDeep(_.keyBy(action.payload, "id"));

      return {
        ...state,
        ...users
      };
    }
    case Actions.UPDATE_USERS_SUCCESS: {
      const newUsers = {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload
        }
      };
      return {
        ...state,
        ...newUsers
      };
    }
    default: {
      return state;
    }
  }
};

export default users;
