import logger from "middleware/logger";
import * as reduxModule from "redux";
import { applyMiddleware, compose, createStore } from "redux";
import createReducer from "./store/reducers";
import thunk from "redux-thunk";
import { DevTools } from "utils";

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = "@@redux/INIT";

const composeEnhancers =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        serialize: true,
        trace: true
      })
    : compose;

const devToolsExtActive = !!window.__REDUX_DEVTOOLS_EXTENSION__;

const DevToolsInstrument = devToolsExtActive
  ? f => f //if extension is active, return empty object
  : DevTools.instrument({ serialize: true, trace: true });

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
  DevToolsInstrument
);

const store = createStore(createReducer(), enhancer);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export { store };
