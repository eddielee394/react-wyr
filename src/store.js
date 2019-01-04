import logger from "middleware/logger";
import * as reduxModule from "redux";
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import createReducer from "./store/reducers";
import thunk from "redux-thunk";
import { DevTools } from "utils";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
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

console.log(window.__REDUX_DEVTOOLS_EXTENSION__ ? "true" : "false");

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__
  ? composeEnhancers(applyMiddleware(thunk, logger))
  : composeEnhancers(
      applyMiddleware(thunk, logger),
      DevTools.instrument({ serialize: true, trace: true })
    );

const store = createStore(createReducer(), enhancer);
// let persistor = persistStore(store);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

// export { store, persistor };
export { store };