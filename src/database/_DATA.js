import jwt from "jsonwebtoken";
import { normalize } from "normalizr";
import { API, Schemas } from "utils";
import mock from "./mock";
import _ from "@lodash";
import { Helpers } from "utils";
import { amber, blue, blueGrey, green } from "@material-ui/core/colors";

const jwtConfig = {
  secret: "local-secret",
  expiresIn: "2 days" // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

/**
 * Users Data
 * @type {{im_not_a_horse: {id: string, name: string, avatarURL: string, answers: {"8xf0y6ziyjabvozdd253nd": string, "6ni6ok3ym7mf1p33lnez": string, am8ehyc8byjqgar0jgpub9: string, loxhs1bqm25b708cmbf3g: string}, questions: string[]}, burt_b: {id: string, name: string, avatarURL: string, answers: {vthrdm985a262al8qx3do: string, xj352vofupe1dqz9emx13r: string}, questions: string[]}, johndoe: {id: string, name: string, avatarURL: string, answers: {xj352vofupe1dqz9emx13r: string, vthrdm985a262al8qx3do: string, "6ni6ok3ym7mf1p33lnez": string}, questions: string[]}}}
 */
let users = {
  da_anchorman: {
    id: "da_anchorman",
    from: "localStorage",
    password: "password",
    role: "user",
    data: {
      displayName: "da_anchorman",
      name: "Ron Burgundy",
      avatarURL: "http://i.pravatar.cc/150?img=51",
      email: "da_anchorman@test.com",
      answers: {
        xj352vofupe1dqz9emx13r: "answerOne",
        vthrdm985a262al8qx3do: "answerTwo",
        loxhs1bqm25b708cmbf3g: "answerTwo",
        "6ni6ok3ym7mf1p33lnez": "answerOne"
      },
      questions: ["6ni6ok3ym7mf1p33lnez", "xj352vofupe1dqz9emx13r"],
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
  burt_b: {
    id: "burt_b",
    from: "localStorage",
    password: "password",
    role: "user",
    data: {
      displayName: "burt_b",
      name: "Burt Beynolds",
      avatarURL: "http://i.pravatar.cc/150?img=53",
      email: "burt_b@test.com",
      answers: {
        vthrdm985a262al8qx3do: "answerOne",
        xj352vofupe1dqz9emx13r: "answerTwo",
        xj352vofupe1dqz3emx15z: "answerOne"
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
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
  },
  im_not_a_horse: {
    id: "im_not_a_horse",
    from: "localStorage",
    password: "password",
    role: "user",
    data: {
      displayName: "im_not_a_horse",
      name: "Sarah Jessica Marker",
      avatarURL: "http://i.pravatar.cc/150?img=47",
      email: "im_not_a_horse@test.com",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "answerOne",
        "6ni6ok3ym7mf1p33lnez": "answerOne",
        am8ehyc8byjqgar0jgpub9: "answerTwo",
        loxhs1bqm25b708cmbf3g: "answerTwo"
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
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
};

/**
 * Questions Data
 * @type {{"8xf0y6ziyjabvozdd253nd": {id: string, author: string, timestamp: number, 1: {votes: string[], text: string}, 2: {votes: Array, text: string}}, "6ni6ok3ym7mf1p33lnez": {id: string, author: string, timestamp: number, 1: {votes: Array, text: string}, 2: {votes: string[], text: string}}, am8ehyc8byjqgar0jgpub9: {id: string, author: string, timestamp: number, 1: {votes: Array, text: string}, 2: {votes: string[], text: string}}, loxhs1bqm25b708cmbf3g: {id: string, author: string, timestamp: number, 1: {votes: Array, text: string}, 2: {votes: string[], text: string}}, vthrdm985a262al8qx3do: {id: string, author: string, timestamp: number, 1: {votes: string[], text: string}, 2: {votes: string[], text: string}}, xj352vofupe1dqz9emx13r: {id: string, author: string, timestamp: number, 1: {votes: string[], text: string}, 2: {votes: string[], text: string}}}}
 */
let questions = [
  {
    id: "8xf0y6ziyjabvozdd253nd",
    author: { id: "im_not_a_horse" },
    timestamp: 1545099175000,
    title: "Memory",
    answers: {
      answerOne: {
        id: "answerOne",
        votes: [{ id: "im_not_a_horse" }],
        text: "have horrible short term memory"
      },
      answerTwo: {
        id: "answerTwo",
        votes: [],
        text: "have horrible long term memory"
      }
    },
    categoryId: "1"
  },
  {
    id: "6ni6ok3ym7mf1p33lnez",
    author: { id: "da_anchorman" },
    timestamp: 1543111975000,
    title: "Evil or good?",
    answers: {
      answerOne: { id: "answerOne", votes: [], text: "become a superhero" },
      answerTwo: {
        id: "answerTwo",
        votes: [{ id: "da_anchorman" }, { id: "im_not_a_horse" }],
        text: "become a supervillian"
      }
    },
    categoryId: "3"
  },
  {
    id: "am8ehyc8byjqgar0jgpub9",
    author: { id: "im_not_a_horse" },
    timestamp: 1545876775000,
    title: "Superpowers",
    answers: {
      answerOne: { id: "answerOne", votes: [], text: "be telekinetic" },
      answerTwo: {
        id: "answerTwo",
        votes: [{ id: "im_not_a_horse" }],
        text: "be telepathic"
      }
    },
    categoryId: "2"
  },
  {
    id: "loxhs1bqm25b708cmbf3g",
    author: { id: "burt_b" },
    timestamp: 1543112975000,
    title: "Front-end or Back-end?",
    answers: {
      answerOne: {
        id: "answerOne",
        votes: [],
        text: "be a front-end developer"
      },
      answerTwo: {
        id: "answerTwo",
        votes: ["im_not_a_horse"],
        text: "be a back-end developer"
      }
    },
    categoryId: "1"
  },
  {
    id: "vthrdm985a262al8qx3do",
    author: { id: "burt_b" },
    timestamp: 1489579767190,
    title: "Money",
    answers: {
      answerOne: {
        id: "answerOne",
        votes: ["burt_b"],
        text: "find $50 yourself"
      },
      answerTwo: {
        id: "answerTwo",
        votes: ["da_anchorman"],
        text: "have your best friend find $500"
      }
    },
    categoryId: "4"
  },
  {
    id: "xj352vofupe1dqz9emx13r",
    author: { id: "da_anchorman" },
    timestamp: 1544667175000,
    title: "JS or Swift?",
    answers: {
      answerOne: {
        id: "answerOne",
        votes: ["da_anchorman"],
        text: "write JavaScript"
      },
      answerTwo: { id: "answerTwo", votes: ["burt_b"], text: "write Swift" }
    },
    categoryId: "5"
  },
  {
    id: "xj352vofupe1dqz3emx15z",
    author: { id: "da_anchorman" },
    timestamp: 1493579767190,
    title: "JS or Swift?",
    answers: {
      answerOne: {
        id: "answerOne",
        votes: ["da_anchorman"],
        text: "write JavaScript"
      },
      answerTwo: { id: "answerTwo", votes: ["burt_b"], text: "write Swift" }
    },
    categoryId: "1"
  }
];

let categories = [
  {
    id: "1",
    value: "reactjs-basic",
    label: "ReactJS Basic",
    color: amber[500]
  },
  {
    id: "2",
    value: "reactjs-advanced",
    label: "ReactJS Advanced",
    color: amber[500]
  },
  {
    id: "3",
    value: "react-router",
    label: "React Router",
    color: blueGrey[500]
  },
  {
    id: "4",
    value: "react-redux",
    label: "React Redux",
    color: green[500]
  },
  {
    id: "5",
    value: "jwt-authentication",
    label: "JWT Authentication",
    color: green[500]
  },
  {
    id: "6",
    value: "react-native",
    label: "React Native",
    color: green[500]
  },
  {
    id: "7",
    value: "es6",
    label: "ES6",
    color: green[500]
  },
  {
    id: "8",
    value: "misc",
    label: "Misc",
    color: blue[500]
  }
];

// store array in local storage for registered users
// users = JSON.parse(localStorage.getItem("users")) || users;
//
// export function configureFakeDB() {
//   localStorage.setItem("users", JSON.stringify(users));
//   localStorage.setItem("questions", JSON.stringify(questions));
// }

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
 * @return {Promise<{id: string, author: string, 1: Object, 2: Object, timestamp: Object}>}
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

/**
 * Questions mock requests
 */
mock.onGet("/api/questions").reply(request => {
  // questions = Object.values(questions);

  let response = questions;

  if (request.params) {
    const { categoryId } = request.params;

    const category = _.find(categories, { value: categoryId });
    const _categoryId = categoryId;

    questions = questions.filter(
      question => question.categoryId === _categoryId
    );

    response = {
      questions,
      category: category
    };

    return [200, response];
  }
  return [200, questions];
});

mock.onGet("/api/question").reply(request => {
  const { questionId } = request.params;

  const response = _.find(questions, { id: questionId });

  return [200, response];
});

mock.onGet("/api/question/save").reply(request => {
  const data = JSON.parse(request.data);
  let question = null;

  //check if the question exists in the db, if so return it so we can use it later, otherwise return the new question
  questions = questions.map(_question => {
    if (_question.id === data.id) {
      question = data;
      return question;
    }
    return _question;
  });

  //if the question doesn't exist let's add the new one to the existing questions array
  if (!question) {
    question = data;
    questions = [...questions, question];
  }
  return [200, question];
});

mock.onPost("/api/question/update").reply(request => {
  const data = JSON.parse(request.data);
  questions = Object.values(questions);

  /*sample data

  let _questions = {
    ...questions,
    [data.questionId]: {
      ...questions[data.questionId],
      [data.answer]: {
        ...questions[data.questionId][data.answer],
        votes: questions[data.questionId][data.answer].votes.concat([
          data.authUser
        ])
      }
    }
  };
  console.log("Question update sample merged questions: ", _questions);
  */

  /*
        data: [
        {
          id: '8xf0y6ziyjabvozdd253nd',
          userId: 'im_not_a_horse',
          timestamp: 1545099175000,
          title: 'Memory',
          answers: {
            answerOne: {
              votes: [
                'im_not_a_horse'
              ],
              text: 'have horrible short term memory'
            },
            answerTwo: {
              votes: [],
              text: 'have horrible long term memory'
            }
          },
          categoryId: 1
        },
        ]
   */

  console.log("Question update post request: ", request, request.data, data);
  console.log("Question update post request.data: ", request.data);
  console.log("Question update post data: ", data);

  questions = questions.map(_question => {
    console.log("Axios question 0: ", _question, _question.id);

    if (_question.id === data.questionId) {
      console.log("Axios question 1: ", _question);
      // ...questions[data.questionId][data.answer]
      return _.merge(_question.answers[data.answerId], data);
    }
    console.log("Axios question 2: ", _question);
    return _question;
  });

  return [200, data];
});

mock.onGet("/api/questions/categories").reply(() => {
  return [200, categories];
});

mock.onGet("/api/questions/category").reply(request => {
  console.log("Axios category request: ", request);
  const { config } = request;
  const { params } = config;
  const { categoryId } = params;
  console.log("Axios category request: ", params);
  // console.log("Axios category id: ", categoryId);
  const response = _.find(categories, { value: categoryId });
  // console.log("Axios category response: ", response);

  return [200, response];
});

/**
 * Users mock requests
 */
mock.onGet("/api/users").reply(config => {
  users = Object.values(users);
  const response = users;
  if (users) {
    return [200, response];
  }

  const error = {};
  return [200, { error }];
});

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

    const access_token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      // users,
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

    const user = _.cloneDeep(users.find(_user => _user.id === id));
    delete user.password;

    const updatedAccessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
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
      id: Helpers.generateUID(),
      from: "localStorage",
      password,
      role: "user",
      token: null,
      data: {
        displayName,
        avatarURL: "http://pravatar.cc/128",
        email,
        settings: {},
        shortcuts: []
      }
    };

    users = [...users, newUser];

    const user = _.cloneDeep(newUser);
    delete user.password;

    const access_token = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    // localStorage.setItem("users", JSON.stringify(users));

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
    if (_user.id === user.id) {
      return _.merge(_user, user);
    }
    return _user;
  });

  return [200, user];
});
