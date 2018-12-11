import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducers";
import middleware from "./middleware";
import { composeWithDevTools } from "redux-devtools-extension";
import { Router } from "react-router-dom";
import { history } from "./utils/history";

const store = createStore(reducer, composeWithDevTools(middleware));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
