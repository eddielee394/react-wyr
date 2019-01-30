import { CALL_API } from "app/middleware/api";
import { API, Schemas } from "app/utils";
import * as UserActions from "app/auth/store/actions";

export const REGISTER = "[AUTH] REGISTER";
export const REGISTER_FAILURE = "[AUTH] REGISTER FAILURE";
export const REGISTER_SUCCESS = "[AUTH] REGISTER SUCCESS";

export const submitRegister = data => dispatch => {
  dispatch({
    [CALL_API]: {
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: API.registerUser(),
      method: "POST",
      data: data,
      schema: Schemas.questionsList
    }
  }).then(data => {
    dispatch(UserActions.storeUserData(data.payload.user));
  });
};
