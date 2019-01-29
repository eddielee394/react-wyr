/**
 * Api middleware
 * @des Inspired by https://github.com/reduxjs/redux/tree/master/examples/real-world
 */
import axios from "axios";

const axiosRequest = ({ data, endpoint, method, params, ...config }) => {
  return axios({
    data: data,
    method: method,
    url: endpoint,
    params: params,
    config
  });
};

const apiRequest = params => {
  return axiosRequest(params);
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = params => {
  return apiRequest(params)
    .then(response => {
      // return Object.assign({}, normalize(response.data, schema));
      return response.data;
    })
    .catch(error => {
      return Promise.reject(error.message);
    });
};

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = "Call API";

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { schema, types, method, data, ...config } = callAPI;
  const validMethods = [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS"
  ];

  if (typeof method === "undefined") {
    throw new Error("[RSAA] must have a method property");
  } else if (typeof method !== "string") {
    throw new Error("[RSAA].method property must be a string");
  } else if (!~validMethods.indexOf(method.toUpperCase())) {
    throw new Error(`Invalid [RSAA].method: ${method.toUpperCase()}`);
  }

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!schema) {
    throw new Error("Specify one of the exported Schemas.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi({ endpoint, method, schema, data, ...config }).then(
    response =>
      next(
        actionWith({
          type: successType,
          payload: response,
          config: config
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error || "Something bad happened"
        })
      )
  );
};
