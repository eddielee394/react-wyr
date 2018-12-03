/**
 * Logger middleware
 * @summary middleware
 * @param store
 * @return {function(*): function(*=): *}
 */
const logger = store => next => action => {
  //invokes all the console.log's in a single group
  console.group(action.type);
  console.log("The action: ", action);
  const result = next(action);
  console.log("The new state: ", store.getState());
  console.groupEnd();
  return result;
};

export default logger;
