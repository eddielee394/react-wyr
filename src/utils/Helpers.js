import moment from "moment";

class Helpers {
  /**
   * Format date
   * @function
   * @example h:i A | mm/dd/yyyy
   * @param timestamp
   * @param relative
   * @return {string}
   */
  static formatDate = (timestamp, relative = true) => {
    const d = new Date(timestamp);

    if (relative) {
      return moment.utc(d).fromNow();
    }

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
  static formatQuestion = ({
    category,
    title,
    answerOneText,
    answerTwoText,
    author
  }) => {
    return {
      id: Helpers.generateUID(),

      author: { id: author },
      timestamp: Date.now(),
      title: title,
      answers: {
        answerOne: {
          id: "answerOne",
          votes: [],
          text: answerOneText
        },
        answerTwo: {
          id: "answerTwo",
          votes: [],
          text: answerTwoText
        }
      },
      categoryId: category
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
    let value = (100 * partialValue) / totalValue;
    value = value.toFixed(0);
    value = Math.min(value, 100);

    return value;
  };

  static rankArray = (num, arr) =>
    arr
      .sort(function(a, b) {
        return b - a;
      })
      .indexOf(num) + 1;
}

export default Helpers;
