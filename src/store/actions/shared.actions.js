import { Api } from "../../utils";
import { receiveQuestions } from "./question.actions";
import { receiveUsers } from "./users.actions";
/**
 * Handles loading initial user & questions data
 * @method
 * @return {function(*): Promise<{users: Object }>}
 */
export const handleInitialData = () => dispatch => {
  return Api.getInitialData().then(({ users, questions }) => {
    //add objects to the redux store
    dispatch(receiveQuestions(questions));
    // dispatch(receiveUsers(users));
  });
};
