import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from "../fake-db/_DATA";

/**
 * API Methods
 * @namespace API
 * @param {function} getInitialData
 * @param {function} getUsers
 * @param {function} getQuestions
 * @param {function} saveQuestion
 * @param {function} saveQuestionAnswer
 * @type {{getInitialData: (function(): Promise<{users: Object, questions: Object} | never>), getUsers: (function(): Promise<{Object}>), getQuestions: (function(): Promise<Object>), saveQuestion: (function(*=): Promise<Object>), saveQuestionAnswer: (function(*=): Promise<Object>)}}
 */
class API {
  /**
   * Gets the initial application data
   * @function
   * @memberof API
   * @return {Promise<{users: {Object}, questions: {Object}} | never>}
   */
  static getInitialData = () =>
    Promise.all([API.getUsers(), API.getQuestions()]).then(
      ([users, questions]) => ({
        users,
        questions
      })
    );

  /**
   * Gets users from database
   * @function
   * @description Get all of the existing users from the database
   * @return {Promise<{users: {Object}}>} Object where the key is the user’s id and the value is the user object
   */
  static getUsers = () => _getUsers();

  /**
   * Gets questions from database
   * @description Get all of the existing questions from the database
   * @function
   * @return {Promise<{questions: Object}>} Object where the key is the question’s id and the value is the question object
   */
  static getQuestions = () => _getQuestions();

  /**
   * Saves a question
   * @description Save the polling question in the database
   * @param params
   * @function
   * @return {Promise<{id: string, author: string, optionOne: Object, optionTwo: Object, timestamp: Object}>}
   */
  static saveQuestion = params => _saveQuestion(params);

  /**
   * Saves the answer to a question
   * @description Save the answer to a particular polling question in the database.
   * @param params
   * @function
   * @return {Promise<{authUser: string, questionId: string, answer: string }>}
   */
  static saveQuestionAnswer = params => _saveQuestionAnswer(params);
}

export default API;