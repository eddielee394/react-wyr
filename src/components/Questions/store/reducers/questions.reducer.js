import * as Actions from '../actions';

const initialState = {
    data          : [],
    categories    : [],
    searchText    : '',
    categoryFilter: 'all'
};

const questionsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_QUESTIONS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                categories: action.payload
            };
        }
        case Actions.SET_QUESTIONS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_QUESTIONS_CATEGORY_FILTER:
        {
            return {
                ...state,
                categoryFilter: action.category
            };
        }
        default:
        {
            return state;
        }
    }
};

export default questionsReducer;
