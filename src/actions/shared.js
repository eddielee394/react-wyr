import { getInitialData } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export const handleInitialData = () => dispatch => {
  return getInitialData().then(({ users, questions }) => {
    //add objects to the redux store
    dispatch(receiveQuestions(questions));
    dispatch(receiveUsers(users));
  });
};
