import _ from "@lodash";
import { amber, blue, blueGrey, green } from "@material-ui/core/colors";
import imgAvatarKatina from "assets/images/avatars/katina.jpg";
import imgAvatarOdessa from "assets/images/avatars/odessa.jpg";
import imgAvatarDefault from "assets/images/avatars/profile.jpg";
import imgAvatarTyson from "assets/images/avatars/tyson.jpg";
import imgBg3 from "assets/images/bg-patterns/bg-03.jpg";
import imgBg4 from "assets/images/bg-patterns/bg-04.jpg";
import imgBg5 from "assets/images/bg-patterns/bg-05.jpg";
import imgBg8 from "assets/images/bg-patterns/bg-08.jpg";
import jwt from "jsonwebtoken";
import { Helpers } from "utils";
import jwtService from "utils/jwtService";
import mock from "./mock";

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
      avatarURL: imgAvatarOdessa,
      email: "da_anchorman@test.com",
      answers: {
        xj352vofupe1dqz9emx13r: "answerOne",
        vthrdm985a262al8qx3do: "answerTwo",
        loxhs1bqm25b708cmbf3g: "answerTwo",
        "6ni6ok3ym7mf1p33lnez": "answerOne"
      },
      questions: ["6ni6ok3ym7mf1p33lnez"],
      settings: {
        coverPhotoUrl: imgBg3
      }
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
      avatarURL: imgAvatarTyson,
      email: "burt_b@test.com",
      answers: {
        vthrdm985a262al8qx3do: "answerOne",
        xj352vofupe1dqz9emx13r: "answerTwo",
        xj352vofupe1dqz3emx15z: "answerOne",
        loxhs1bqm25b708cmbf3g: "answerOne",
        am8ehyc8byjqgar0jgpub9: "answerOne"
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
      settings: {
        coverPhotoUrl: imgBg4
      }
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
      avatarURL: imgAvatarKatina,
      email: "im_not_a_horse@test.com",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "answerOne"
      },
      questions: [
        "8xf0y6ziyjabvozdd253nd",
        "am8ehyc8byjqgar0jgpub9",
        "xj352vofupe1dqz9emx13r"
      ],
      settings: {
        coverPhotoUrl: imgBg5
      }
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
        votes: ["im_not_a_horse"],
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
        votes: ["da_anchorman"],
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
      answerOne: { id: "answerOne", votes: ["burt_b"], text: "be telekinetic" },
      answerTwo: {
        id: "answerTwo",
        votes: [],
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
        votes: ["burt_b"],
        text: "be a front-end developer"
      },
      answerTwo: {
        id: "answerTwo",
        votes: [],
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
    author: { id: "im_not_a_horse" },
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
 * Questions mock requests
 */
mock.onGet("/api/questions").reply(request => {
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

mock.onPost("/api/questions").reply(request => {
  const data = JSON.parse(request.data);
  const question = Helpers.formatQuestion(data);

  return [200, question];
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

mock.onGet("/api/questions/categories").reply(() => {
  return [200, categories];
});

mock.onGet("/api/questions/category").reply(request => {
  const { config } = request;
  const { params } = config;
  const { categoryId } = params;
  // "Axios category id: ", categoryId);
  const response = _.find(categories, { value: categoryId });
  // "Axios category response: ", response);

  return [200, response];
});

/**
 * Users mock requests
 */
mock.onGet("/api/users").reply(config => {
  // users = Object.values(users);
  const response = users;
  if (users) {
    return [200, users];
  }

  const error = {};
  return [404, { error }];
});

mock.onPost("/api/users").reply(request => {
  return [200, users];
});

mock.onGet("/api/auth").reply(config => {
  const data = JSON.parse(config.data);
  const { email, password } = data;

  const user = _.cloneDeep(
    Object.keys(users).find(k => users[k].data.email === email)
  );

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

    const user = _.cloneDeep(Object.keys(users).find(k => users[k].id === id));
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

  const isEmailExists = Object.keys(users).find(
    k => users[k].data.email === email
  );
  const error = {
    email: isEmailExists ? "The email is already in use" : null,
    displayName: displayName !== "" ? null : "Enter display name",
    password: null
  };
  if (!error.displayName && !error.password && !error.email) {
    const newUser = {
      id: displayName,
      from: "localStorage",
      password,
      role: "user",
      access_token: null,
      data: {
        displayName,
        avatarURL: imgAvatarDefault,
        email,
        answers: {},
        questions: [],
        settings: {
          coverPhotoUrl: imgBg8
        }
      }
    };

    users = { ...users, newUser };

    const access_token = jwt.sign({ id: newUser.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const _newUser = _.cloneDeep(newUser);

    const user = _.merge(_newUser, { access_token: access_token });

    const response = {
      user: user,
      access_token: access_token
    };

    jwtService.setSession(access_token);

    return [200, response];
  }
  return [200, { error }];
});
