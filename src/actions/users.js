export const RECEIVE_USERS = "RECEIVE_USERS";

/**
 * Create Receive Users Action
 * @summary action creator
 * @param users
 * @return {{type: string, users: *}}
 */
export const receiveUsers = users => ({
  type: RECEIVE_USERS,
  users
});
