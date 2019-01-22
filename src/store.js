import * as localForage from "localforage";
import { default as applyMiddleware } from "middleware";
import * as reduxModule from "redux";
import { compose, createStore } from "redux";

import { persistReducer, persistStore } from "redux-persist";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { DevTools } from "utils";
import createReducer from "./store/reducers";

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

/**
 * Redux persist
 */
const persistConfig = {
  key: "root",
  storage: localForage,
  timeout: 0,
  // whitelist: ["users", "questions"]
  // stateReconciler: hardSet // see "Merge Process" section for details.
  stateReconciler: autoMergeLevel2,
  blacklist: ["classes"],
  debug: true
};

const persistedReducer = persistReducer(persistConfig, createReducer());
// const store = createStore(createReducer(), enhancer);
const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    persistor.persist();
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(
    persistReducer(persistConfig, createReducer(store.asyncReducers))
  );
  persistor.persist();
  return store;
};

// if (module.hot) {
//   module.hot.accept(() => {
//     // This fetch the new state of the above reducers.
//     const nextRootReducer = require("./path/to/reducer");
//     store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
//   });
// }

export { store, persistor };
// export { store };
