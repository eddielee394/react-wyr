import _ from "@lodash";
import * as Actions from "app/auth/store/actions";

const initialState = {};

const users = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ALL_USERS_SUCCESS: {
      const users = _.cloneDeep(_.keyBy(action.payload, "id"));

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
      const users = _.cloneDeep(_.keyBy(action.payload, "id"));

      return {
        ...state,
        ...users
      };
    }
    default: {
      return state;
    }
  }
};

export default users;
