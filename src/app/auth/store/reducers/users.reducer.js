import _ from "@lodash";
import * as Actions from "app/auth/store/actions";

const initialState = {};

const users = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS: {
      return {
        ...state,
        ..._.keyBy(action.payload, "id")
        // ...action.payload
      };
    }
    case Actions.STORE_USER_SUCCESS: {
      const _users = _.cloneDeep(state);
      // const users = _.keyBy(_users, "id");
      const newUsers = { ..._users, [action.payload.id]: action.payload };

      return {
        ...state,
        ...newUsers
      };
    }
    case Actions.UPDATE_USER_SUCCESS: {
      // const _users = _.cloneDeep(state);
      // const users = _.keyBy(_users, "id");

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
