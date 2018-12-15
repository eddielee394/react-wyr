import { RECEIVE_USERS } from "../actions/users.actions";

/**
 * users reducer
 * @param state
 * @param action PARAM_1 | PARAM_2 | PARAM_3
 * @return {{}}
 */
const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        //receive the state
        ...state,
        //merge the action
        ...action.users
      };
    default:
      return state;
  }
};

export default users;
