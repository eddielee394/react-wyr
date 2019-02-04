import * as history from "history";
const appBasename = process.env.REACT_APP_BASENAME
  ? process.env.REACT_APP_BASENAME
  : "";
export default history.createBrowserHistory({ basename: appBasename });
