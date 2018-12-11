import moment from "moment";

class Helpers {
  /**
   * Format date
   * @function
   * @example h:i A | mm/dd/yyyy
   * @param timestamp
   * @return {string}
   */
  static formatDate = timestamp => {
    const d = new Date(timestamp);

    const formattedDate = moment
      .utc(d)
      .local()
      .format("M/DD/YYYY");

    const formattedTime = moment
      .utc(timestamp)
      .local()
      .format("h:mm A");

    return formattedTime + " | " + formattedDate;
  };

  /**
   * Formats the questions for storage
   * @function
   * @param optionOneText
   * @param optionTwoText
   * @param author
   * @return {{id: string, timestamp: number, author: *, optionOne: {votes: Array, text: *}, optionTwo: {votes: Array, text: *}}}
   */
  static formatQuestion = ({ optionOneText, optionTwoText, author }) => {
    return {
      id: this.generateUID(),
      timestamp: Date.now(),
      author,
      optionOne: {
        votes: [],
        text: optionOneText
      },
      optionTwo: {
        votes: [],
        text: optionTwoText
      }
    };
  };

  /**
   * Generate User Id
   * @function
   * @return {string}
   */
  static generateUID = () => {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  };

  /**
   * Calculates a percentage value from two numbers
   * @function
   * @param partialValue
   * @param totalValue
   * @return {string}
   */
  static calcPercent = (partialValue, totalValue) => {
    //do the calculation
    let value = (100 * partialValue) / totalValue;
    //ditch the decimals
    value = value.toFixed(0);
    //don't return more than 100%
    value = Math.min(value, 100);

    return `${value}%`;
  };
}

export default Helpers;
