import * as reduxModule from "redux";
import { compose, createStore } from "redux";
import { default as applyMiddleware } from "middleware";
import createReducer from "./store/reducers";
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

const devToolsInstrument = devToolsExtActive
  ? f => f //if extension is active, return empty object
  : DevTools.instrument({ serialize: true, trace: true });

const enhancer = composeEnhancers(applyMiddleware, devToolsInstrument);

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
