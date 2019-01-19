import { Helpers } from "utils";
import * as Actions from "../actions";
import _ from "@lodash";

const initialState = {
  entities: [],
  searchText: "",
  routeParams: {}
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_USERS: {
      return {
        ...state,
        entities: _.keyBy(action.payload, "id"),
        routeParams: action.routeParams
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }

    case Actions.GET_USERS_STATS: {
      const globalQATotal = _.map(state.entities, k =>
        _.add(Object.keys(k.data.answers).length, k.data.questions.length)
      );

      const entitiesArray = Object.keys(state.entities).map(k => {
        let questionsAnswered = Object.keys(state.entities[k].data.answers)
          .length;
        let questionsAsked = state.entities[k].data.questions.length;
        const QATotal = _.add(questionsAnswered, questionsAsked);

        let globalRank = Helpers.rankArray(QATotal, globalQATotal);

        let updatedEntity = {
          ...state.entities[k],
          data: {
            ...state.entities[k].data,
            globalRank: globalRank,
            questionsAnswered: questionsAnswered,
            questionsAsked: questionsAsked
          }
        };

        return updatedEntity;
      });

      const entities = _.keyBy(entitiesArray, "id");

      return {
        ...state,
        entities: {
          ...state.entities,
          ...entities
        }
      };
    }

    default: {
      return state;
    }
  }
};

export default leaderboardReducer;
