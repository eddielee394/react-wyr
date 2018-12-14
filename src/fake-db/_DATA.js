import jwt from "jsonwebtoken";
import mock from "./mock";
import _ from "@lodash";
import { Helpers } from "utils";

const jwtConfig = {
  secret: "some-secret-code-goes-here",
  expiresIn: "2 days" // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

/**
 * Users Data
 * @type {{im_not_a_horse: {id: string, name: string, avatarURL: string, answers: {"8xf0y6ziyjabvozdd253nd": string, "6ni6ok3ym7mf1p33lnez": string, am8ehyc8byjqgar0jgpub9: string, loxhs1bqm25b708cmbf3g: string}, questions: string[]}, burt_b: {id: string, name: string, avatarURL: string, answers: {vthrdm985a262al8qx3do: string, xj352vofupe1dqz9emx13r: string}, questions: string[]}, johndoe: {id: string, name: string, avatarURL: string, answers: {xj352vofupe1dqz9emx13r: string, vthrdm985a262al8qx3do: string, "6ni6ok3ym7mf1p33lnez": string}, questions: string[]}}}
 */
// let users = {
//   im_not_a_horse: {
//     id: "im_not_a_horse",
//     name: "Sarah Jessica Marker",
//     avatarURL: "http://i.pravatar.cc/50?img=47",
//     answers: {
//       "8xf0y6ziyjabvozdd253nd": "optionOne",
//       "6ni6ok3ym7mf1p33lnez": "optionOne",
//       am8ehyc8byjqgar0jgpub9: "optionTwo",
//       loxhs1bqm25b708cmbf3g: "optionTwo"
//     },
//     questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"]
//   },
//   burt_b: {
//     id: "burt_b",
//     name: "Burt Beynolds",
//     avatarURL: "http://i.pravatar.cc/50?img=53",
//     answers: {
//       vthrdm985a262al8qx3do: "optionOne",
//       xj352vofupe1dqz9emx13r: "optionTwo"
//     },
//     questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"]
//   },
//   johndoe: {
//     id: "johndoe",
//     name: "John Doe",
//     avatarURL: "http://i.pravatar.cc/50?img=51",
//     answers: {
//       xj352vofupe1dqz9emx13r: "optionOne",
//       vthrdm985a262al8qx3do: "optionTwo",
//       "6ni6ok3ym7mf1p33lnez": "optionOne"
//     },
//     questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"]
//   }
// };

let users = [
  {
    uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
    from: "custom-db",
    password: "admin",
    role: "admin",
    data: {
      displayName: "Abbott Keitch",
      photoURL: "assets/images/avatars/Abbott.jpg",
      email: "admin",
      settings: {
        layout: {
          style: "layout1",
          config: {
            scroll: "content",
            navbar: {
              display: true,
              folded: true,
              position: "left"
            },
            toolbar: {
              display: true,
              style: "fixed",
              position: "below"
            },
            footer: {
              display: true,
              style: "fixed",
              position: "below"
            },
            mode: "fullwidth"
          }
        },
        customScrollbars: true,
        theme: {
          main: "defaultDark",
          navbar: "defaultDark",
          toolbar: "defaultDark",
          footer: "defaultDark"
        }
      },
      shortcuts: ["calendar", "mail", "contacts"]
    }
  },
  {
    uuid: "XgbuVEXBU6gtSKdbTYR1Zbbby1i3",
    from: "custom-db",
    password: "staff",
    role: "staff",
    data: {
      displayName: "Arnold Matlock",
      photoURL: "assets/images/avatars/Arnold.jpg",
      email: "staff",
      settings: {
        layout: {
          style: "layout2",
          config: {
            mode: "boxed",
            scroll: "content",
            navbar: {
              display: true
            },
            toolbar: {
              display: true,
              position: "below"
            },
            footer: {
              display: true,
              style: "fixed"
            }
          }
        },
        customScrollbars: true,
        theme: {
          main: "greeny",
          navbar: "mainThemeDark",
          toolbar: "mainThemeDark",
          footer: "mainThemeDark"
        }
      },
      shortcuts: ["calendar", "mail", "contacts", "todo"]
    }
  }
];

/**
 * Questions Data
 * @type {{"8xf0y6ziyjabvozdd253nd": {id: string, author: string, timestamp: number, optionOne: {votes: string[], text: string}, optionTwo: {votes: Array, text: string}}, "6ni6ok3ym7mf1p33lnez": {id: string, author: string, timestamp: number, optionOne: {votes: Array, text: string}, optionTwo: {votes: string[], text: string}}, am8ehyc8byjqgar0jgpub9: {id: string, author: string, timestamp: number, optionOne: {votes: Array, text: string}, optionTwo: {votes: string[], text: string}}, loxhs1bqm25b708cmbf3g: {id: string, author: string, timestamp: number, optionOne: {votes: Array, text: string}, optionTwo: {votes: string[], text: string}}, vthrdm985a262al8qx3do: {id: string, author: string, timestamp: number, optionOne: {votes: string[], text: string}, optionTwo: {votes: string[], text: string}}, xj352vofupe1dqz9emx13r: {id: string, author: string, timestamp: number, optionOne: {votes: string[], text: string}, optionTwo: {votes: string[], text: string}}}}
 */
let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "im_not_a_horse",
    timestamp: 1467166872634,
    optionOne: {
      votes: ["im_not_a_horse"],
      text: "have horrible short term memory"
    },
    optionTwo: {
      votes: [],
      text: "have horrible long term memory"
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "johndoe",
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: "become a superhero"
    },
    optionTwo: {
      votes: ["johndoe", "im_not_a_horse"],
      text: "become a supervillian"
    }
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "im_not_a_horse",
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: "be telekinetic"
    },
    optionTwo: {
      votes: ["im_not_a_horse"],
      text: "be telepathic"
    }
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "burt_b",
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: "be a front-end developer"
    },
    optionTwo: {
      votes: ["im_not_a_horse"],
      text: "be a back-end developer"
    }
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "burt_b",
    timestamp: 1489579767190,
    optionOne: {
      votes: ["burt_b"],
      text: "find $50 yourself"
    },
    optionTwo: {
      votes: ["johndoe"],
      text: "have your best friend find $500"
    }
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "johndoe",
    timestamp: 1493579767190,
    optionOne: {
      votes: ["johndoe"],
      text: "write JavaScript"
    },
    optionTwo: {
      votes: ["burt_b"],
      text: "write Swift"
    }
  }
};

/**
 * Gets Users
 * @return {Promise<{users: Object}>}
 * @private
 */
export function _getUsers() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 1000);
  });
}

/**
 * Gets Questions
 * @return {Promise<{questions: Object}>}
 * @private
 */
export function _getQuestions() {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...questions }), 1000);
  });
}

/**
 * Saves the question
 * @param question
 * @return {Promise<{id: string, author: string, optionOne: Object, optionTwo: Object, timestamp: Object}>}
 * @private
 */
export function _saveQuestion(question) {
  return new Promise((res, rej) => {
    const authUser = question.author;
    const formattedQuestion = Helpers.formatQuestion(question);

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      };

      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          questions: users[authUser].questions.concat([formattedQuestion.id])
        }
      };

      res(formattedQuestion);
    }, 1000);
  });
}

/**
 * Saves answer to the question
 * @param authUser
 * @param questionId
 * @param answer
 * @return {Promise<{authUser: string, questionId: string, answer: string }>}
 * @private
 */
export function _saveQuestionAnswer({ authUser, questionId, answer }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authUser]: {
          ...users[authUser],
          answers: {
            ...users[authUser].answers,
            [questionId]: answer
          }
        }
      };

      questions = {
        ...questions,
        [questionId]: {
          ...questions[questionId],
          [answer]: {
            ...questions[questionId][answer],
            votes: questions[questionId][answer].votes.concat([authUser])
          }
        }
      };

      res();
    }, 500);
  });
}

mock.onGet("/api/auth").reply(config => {
  const data = JSON.parse(config.data);
  const { email, password } = data;

  const user = _.cloneDeep(users.find(_user => _user.data.email === email));

  const error = {
    email: user ? null : "Check your username/email",
    password: user && user.password === password ? null : "Check your password"
  };

  if (!error.email && !error.password && !error.displayName) {
    delete user.password;

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      users,
      user,
      access_token
    };

    return [200, response];
  }
  return [200, { error }];
});

mock.onGet("/api/auth/access-token").reply(config => {
  const data = JSON.parse(config.data);
  const { access_token } = data;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);

    const user = _.cloneDeep(users.find(_user => _user.uuid === id));
    delete user.password;

    const updatedAccessToken = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user,
      access_token: updatedAccessToken
    };

    return [200, response];
  } catch (e) {
    const error = "Invalid access token detected";
    return [401, { error }];
  }
});

mock.onPost("/api/auth/register").reply(request => {
  const data = JSON.parse(request.data);
  const { displayName, password, email } = data;
  const isEmailExists = users.find(_user => _user.data.email === email);
  const error = {
    email: isEmailExists ? "The email is already in use" : null,
    displayName: displayName !== "" ? null : "Enter display name",
    password: null
  };
  if (!error.displayName && !error.password && !error.email) {
    const newUser = {
      uuid: Helpers.generateUID(),
      from: "custom-db",
      password,
      role: "admin",
      data: {
        displayName,
        avatarUrl: "assets/images/avatars/Abbott.jpg",
        email,
        settings: {},
        shortcuts: []
      }
    };

    users = [...users, newUser];

    const user = _.cloneDeep(newUser);
    delete user.password;

    const access_token = jwt.sign({ id: user.uuid }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });
    localStorage.setItem("users", JSON.stringify(users));
    const response = {
      user,
      access_token
    };

    return [200, response];
  }
  return [200, { error }];
});

mock.onPost("/api/auth/user/update").reply(config => {
  const data = JSON.parse(config.data);
  const { user } = data;

  users = users.map(_user => {
    if (user.uuid === user.id) {
      return _.merge(_user, user);
    }
    return _user;
  });

  return [200, user];
});
