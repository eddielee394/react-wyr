import {default as applyMiddleware} from "app/middleware";
import createReducer from "app/store/reducers";
import {DevTools} from "app/utils";
import * as reduxModule from "redux";
import {compose, createStore} from "redux";
import {autoRehydrate, persistStore} from 'redux-persist'

// noinspection JSUnresolvedVariable
/**
 * Fix for Firefox redux dev tools extension
 * https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 * @type {string}
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

// noinspection JSUnresolvedVariable
/**
 * Root Enhancer
 *
 */
const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: true,
        trace: true
      })
    : compose;

// noinspection JSUnresolvedVariable
/**
 * DevTools browser extension & embed conflict fix
 * @type {boolean}
 */
const devToolsExtActive = !!window.__REDUX_DEVTOOLS_EXTENSION__;
const devToolsInstrument = devToolsExtActive
  ? f => f //if extension is active, return empty object
  : DevTools.instrument({ serialize: true, trace: true });

const enhancer = composeEnhancers(applyMiddleware,autoRehydrate(), devToolsInstrument);

/**
 * Redux-persist init
 *
 */
const store = createStore(createReducer(), enhancer);

store.asyncReducers = {};

/**
 * Code splitting init
 * @param key
 * @param reducer
 * @return {any}
 */
export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));

  return store;
};
persistStore(store);
export default store;
