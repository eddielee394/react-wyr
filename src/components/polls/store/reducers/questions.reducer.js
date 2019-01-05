import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  data: [],
  categories: [],
  category: {},
  searchText: "",
  categoryFilter: 0
};

const questionsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTIONS_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        data: action.payload
      };
    }
    case Actions.GET_QUESTIONS_BY_CATEGORY: {
      return {
        ...state,
        data: action.payload,
        category: action.category
      };
    }
    case Actions.GET_CATEGORY: {
      return {
        ...state,
        category: action.category
      };
    }
    case Actions.SET_QUESTIONS_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.SET_QUESTIONS_CATEGORY_FILTER: {
      return {
        ...state,
        categoryFilter: action.category
      };
    }
    case Actions.UPDATE_QUESTION: {
      console.log("Actions.UPDATE_QUESTION Reducer: ", action.payload);
      //get the users that have already answered the question as an array from the prev state
      const question = state.data.find(
        (_question, index) => _question.id === action.payload.questionId
      );

      const userHasAnswered = question.answers[
        action.payload.answerId
      ].votes.includes(action.payload.authUser);
      console.log("Actions.UPDATE_QUESTION userHasAnswered: ", userHasAnswered);
      let questions = {};
      if (!userHasAnswered) {
        questions = {
          ...state.data
        };
      }
      console.log("Actions.UPDATE_QUESTION questions: ", questions);

      return {
        ...state,
        ...questions
      };
    }
    // case Actions.UPDATE_QUESTION:

    //
    //   //check if the current user has answered the question already
    //   // const userHasAnswered = usersAnswered.includes(
    //   //   action.payload.authUser.id
    //   // );
    //
    //   //create an empty object to use later
    //   let setUserAnswer = {};
    //   //if user has NOT answered the question already
    //   // if (!userHasAnswered) {
    //   //   //create a new object to pass to the store
    //   //
    //   //   setUserAnswer = {
    //   //     //get the question id & build the new question object
    //   //     // [action.payload.questionId]: {
    //   //     //spread the state from the prev question object
    //   //     ...state,
    //   //
    //   //     //find the answer object
    //   //     [action.payload.answerId]: {
    //   //       //spread the  state from the prev answer object
    //   //       ...state.answers[action.payload.answerId],
    //   //       //update the votes on the answer object with the new state
    //   //       votes:
    //   //         //add the user's vote
    //   //         state[action.payload.questionId][
    //   //           action.payload.answerId
    //   //         ].votes.concat([action.payload.authUser])
    //   //     }
    //   //     // }
    //   //   };
    //   //   console.log(setUserAnswer);
    //   // }
    //   return {
    //     ...state,
    //     payload: action.payload
    //   };

    default: {
      return state;
    }
  }
};

export default questionsReducer;
