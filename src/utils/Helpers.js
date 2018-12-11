import moment from "moment";
import _ from "../_lodash";

class EventEmitter {
  constructor() {
    this.events = {};
  }

  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === "undefined") {
      this.events[eventName] = new Set();
    }
    return this.events[eventName];
  }

  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  once(eventName, fn) {
    const self = this;

    const onceFn = function(...args) {
      self.removeListener(eventName, onceFn);
      fn.apply(self, args);
    };
    this.on(eventName, onceFn);
  }

  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(
      function(fn) {
        fn.apply(this, args);
      }.bind(this)
    );
  }

  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }
}

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

  static filterArrayByString(mainArr, searchText) {
    if (searchText === "") {
      return mainArr;
    }

    searchText = searchText.toLowerCase();

    return mainArr.filter(itemObj => {
      return this.searchInObj(itemObj, searchText);
    });
  }

  static searchInObj(itemObj, searchText) {
    for (const prop in itemObj) {
      if (!itemObj.hasOwnProperty(prop)) {
        continue;
      }

      const value = itemObj[prop];

      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      } else if (Array.isArray(value)) {
        if (this.searchInArray(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInArray(arr, searchText) {
    for (const value of arr) {
      if (typeof value === "string") {
        if (this.searchInString(value, searchText)) {
          return true;
        }
      }

      if (typeof value === "object") {
        if (this.searchInObj(value, searchText)) {
          return true;
        }
      }
    }
  }

  static searchInString(value, searchText) {
    return value.toLowerCase().includes(searchText);
  }

  static generateGUID() {
    function S4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return S4() + S4();
  }

  static toggleInArray(item, array) {
    if (array.indexOf(item) === -1) {
      array.push(item);
    } else {
      array.splice(array.indexOf(item), 1);
    }
  }

  static handleize(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/\W+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }

  static setRoutes(config) {
    let routes = [...config.routes];

    if (config.settings || config.auth) {
      routes = routes.map(route => {
        let auth = config.auth ? [...config.auth] : [];
        auth = route.auth ? [...auth, ...route.auth] : auth;
        return {
          ...route,
          settings: { ...config.settings, ...route.settings },
          auth
        };
      });
    }

    return [...routes];
  }

  static generateRoutesFromConfigs(configs) {
    let allRoutes = [];
    configs.forEach(config => {
      allRoutes = [...allRoutes, ...this.setRoutes(config)];
    });
    return allRoutes;
  }

  static findById(o, id) {
    //Early return
    if (o.id === id) {
      return o;
    }
    let result, p;
    for (p in o) {
      if (o.hasOwnProperty(p) && typeof o[p] === "object") {
        result = this.findById(o[p], id);
        if (result) {
          return result;
        }
      }
    }
    return result;
  }

  static getFlatNavigation(navigationItems, flatNavigation) {
    flatNavigation = flatNavigation ? flatNavigation : [];
    for (const navItem of navigationItems) {
      if (navItem.type === "subheader") {
        continue;
      }

      if (navItem.type === "item") {
        flatNavigation.push({
          id: navItem.id,
          title: navItem.title,
          type: navItem.type,
          icon: navItem.icon || false,
          url: navItem.url
        });

        continue;
      }

      if (navItem.type === "collapse" || navItem.type === "group") {
        if (navItem.children) {
          this.getFlatNavigation(navItem.children, flatNavigation);
        }
      }
    }

    return flatNavigation;
  }

  // static randomMatColor(hue) {
  //   hue = hue ? hue : "400";
  //   const mainColors = [
  //     "red",
  //     "pink",
  //     "purple",
  //     "deepPurple",
  //     "indigo",
  //     "blue",
  //     "lightBlue",
  //     "cyan",
  //     "teal",
  //     "green",
  //     "lightGreen",
  //     "lime",
  //     "yellow",
  //     "amber",
  //     "orange",
  //     "deepOrange"
  //   ];
  //   const randomColor =
  //     mainColors[Math.floor(Math.random() * mainColors.length)];
  //   return colors[randomColor][hue];
  // }

  static difference(object, base) {
    function changes(object, base) {
      return _.transform(object, function(result, value, key) {
        if (!_.isEqual(value, base[key])) {
          result[key] =
            _.isObject(value) && _.isObject(base[key])
              ? changes(value, base[key])
              : value;
        }
      });
    }

    return changes(object, base);
  }

  static EventEmitter = EventEmitter;
}

export default Helpers;
