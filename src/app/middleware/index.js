import { applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import api from "./api";

/**
 * Middleware
 */
export default applyMiddleware(thunk, api, logger);
