import api from "middleware/api";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

/**
 * Middleware
 */
export default applyMiddleware(thunk, api, logger);
