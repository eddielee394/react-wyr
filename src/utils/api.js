import { _getQuestions, _getUsers } from "./_DATA";

/**
 * Gets the initial application data
 * @return {Promise<{users: any, questions: any} | never>}
 */
export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions
    })
  );
}
