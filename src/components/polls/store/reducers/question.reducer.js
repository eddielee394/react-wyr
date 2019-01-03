import * as Actions from "../actions";

// const initialState = null;
const initialState = {};

const questionReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_QUESTION: {
      return {
        // ...state,
        ...action.payload
      };
    }
    case Actions.SAVE_QUESTION: {
      return {
        ...action.payload
      };
    }
    // case Actions.UPDATE_QUESTION: {
    //   console.log("Actions.UPDATE_QUESTION Reducer: ", state, action.payload);
    //   return {
    //     ...state,
    //     payload: action.payload
    //   };
    // }
    // case Actions.UPDATE_QUESTION:
    //   //get the users that have already answered the question as an array from the prev state
    //   const usersAnswered = [...state.answers[action.payload.answerId].votes];
    //
    //   //check if the current user has answered the question already
    //   const userHasAnswered = usersAnswered.includes(
    //     action.payload.authUser.id
    //   );
    //
    //   //create an empty object to use later
    //   let setUserAnswer = {};
    //   //if user has NOT answered the question already
    //   if (!userHasAnswered) {
    //     //create a new object to pass to the store
    //
    //     setUserAnswer = {
    //       //get the question id & build the new question object
    //       // [action.payload.questionId]: {
    //       //spread the state from the prev question object
    //       ...state,
    //
    //       //find the answer object
    //       [action.payload.answerId]: {
    //         //spread the  state from the prev answer object
    //         ...state.answers[action.payload.answerId],
    //         //update the votes on the answer object with the new state
    //         votes:
    //           //add the user's vote
    //           state[action.payload.questionId][
    //             action.payload.answerId
    //           ].votes.concat([action.payload.authUser])
    //       }
    //       // }
    //     };
    //     console.log(setUserAnswer);
    //   }
    //   return {
    //     ...state,
    //     payload: action.payload
    //   };
    default: {
      return state;
    }
  }
};

export default questionReducer;
