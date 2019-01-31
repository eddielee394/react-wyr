import axios from "axios/index";

/**
 * API Methods
 * @namespace API
 */
class API {
  /**
   * Gets users from database
   * @function
   * @description Get all of the existing users from the database
   * @return {Promise<{users: {Object}}>} Object where the key is the user’s id and the value is the user object
   */
  static fetchUsers = () => "/api/users";

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

  static fetchQuestionsByCategory = params =>
    axios.get("/api/questions", { params });

  static fetchCategories = () => "/api/questions/categories";

  static fetchCategory = params =>
    axios.get("/api/questions/category", { params });

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
  static updateQuestion = data => "/api/question";

  static logout = () => "/api/auth/logout";
}

export default API;
