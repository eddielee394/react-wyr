import axios from "axios/index";

import {
  _getQuestions,
  _getUsers,
  _saveQuestion,
  _saveQuestionAnswer
} from "../database/_DATA";

/**
 * API Methods
 * @namespace API
 * @param {function} getInitialData
 * @param {function} getUsers
 * @param {function} getQuestions
 * @param {function} storeQuestion
 * @param {function} saveQuestionAnswer
 * @type {{getInitialData: (function(): Promise<{users: Object, questions: Object} | never>), getUsers: (function(): Promise<{Object}>), getQuestions: (function(): Promise<Object>), storeQuestion: (function(*=): Promise<Object>), saveQuestionAnswer: (function(*=): Promise<Object>)}}
 */
class API {
  static ROOT_URL = process.env.REACT_APP_API_ROOT_URL;
  /**
   * Gets the initial application data
   * @function
   * @memberof API
   * @return {Promise<{users: {Object}, questions: {Object}} | never>}
   */
  static fetchInitialData = () =>
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
  static fetchUsers = () => axios.get("/api/users");

  static storeUser = () => "/api/users";

  static registerUser = data => "/api/auth/register";

  /**
   * Gets questions from database
   * @description Get all of the existing questions from the database
   * @function
   * @return {Promise<{questions: Object}>} Object where the key is the question’s id and the value is the question object
   */
  static fetchQuestions = () => "/api/questions";

  static fetchQuestion = params => axios.get("/api/question", { params });

  static fetchQuestionsByCategory = () => "/api/questions";

  static fetchCategories = () => "/api/questions/categories";

  static fetchCategory = () => "/api/questions/category";

  /**
   * Saves a question
   * @description Save the polling question in the database
   * @function
   * @return {Promise<{id: string, author: string, optionOne: Object, optionTwo: Object, timestamp: Object}>}
   * @param data
   */
  static storeQuestion = data => "/api/questions";

  /**
   * Saves the answer to a question
   * @description Save the answer to a particular polling question in the database.
   * @function
   * @return {Promise<{authUser: string, questionId: string, answer: string }>}
   * @param data
   */
  static updateQuestion = data => "/api/question/update";
}

export default API;
