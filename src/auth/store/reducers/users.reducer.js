import _ from "@lodash";
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
    case Actions.STORE_USER_SUCCESS: {
      const users = _.cloneDeep(state);
      const usersArray = Object.keys(users).map(k => users[k]);
      const newUsers = [...usersArray, action.payload];

      return {
        ...state,
        ...newUsers
      };
    }
    case Actions.UPDATE_USER_SUCCESS: {
      const _users = _.cloneDeep(state);
      const users = _.keyBy(_users, "id");

      const newUsers = {
        ...users,
        [action.payload.id]: {
          ...users[action.payload.id],
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
