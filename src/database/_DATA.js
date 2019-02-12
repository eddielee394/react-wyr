import _ from "@lodash";
import {amber, blue, blueGrey, green} from "@material-ui/core/colors";
import {Helpers} from "app/utils";
import jwtService from "app/utils/jwtService";
import imgAvatarKatina from "assets/images/avatars/katina.jpg";
import imgAvatarOdessa from "assets/images/avatars/odessa.jpg";
import imgAvatarDefault from "assets/images/avatars/profile.jpg";
import imgAvatarTyson from "assets/images/avatars/tyson.jpg";
import imgBg3 from "assets/images/bg-patterns/bg-03.jpg";
import imgBg4 from "assets/images/bg-patterns/bg-04.jpg";
import imgBg5 from "assets/images/bg-patterns/bg-05.jpg";
import imgBg8 from "assets/images/bg-patterns/bg-08.jpg";
import jwt from "jsonwebtoken";
import * as localforage from "localforage";
import mock from "./mock";

/**
 * Users Data
 *
 */
const db = {
  users: [
    {
      id: "da_anchorman",
      from: "localStorage",
      password: "password",
      role: "user",
      data: {
        displayName: "da_anchorman",
        name: "Ron Burgundy",
        avatarURL: imgAvatarOdessa,
        email: "da_anchorman",
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
    {
      id: "burt_b",
      from: "localStorage",
      password: "password",
      role: "user",
      data: {
        displayName: "burt_b",
        name: "Burt Beynolds",
        avatarURL: imgAvatarTyson,
        email: "burt_b",
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
    {
      id: "im_not_a_horse",
      from: "localStorage",
      password: "password",
      role: "user",
      data: {
        displayName: "im_not_a_horse",
        name: "Sarah Jessica Marker",
        avatarURL: imgAvatarKatina,
        email: "im_not_a_horse",
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
  ],

  user: {
    id: "guest",
    from: "localStorage",
    password: null,
    role: "guest",
    data: {
      displayName: "Guest",
      avatarURL: imgAvatarDefault,
      email: "test@test.com"
    }
  },

  questions: [
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
        answerOne: {
          id: "answerOne",
          votes: ["burt_b"],
          text: "be telekinetic"
        },
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
  ],

  categories: [
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
  ]
};

/**
 * JWT Config
 * @param secret authorization secret
 * @param expiresIn A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
 */
const jwtConfig = {
  secret: "local_secret",
  expiresIn: "2 days" //
};

const migrationKeys = {
  users: db.users,
  categories: db.categories,
  questions: db.questions,
  user: db.user
};

/**
 * Setup localforage db
 */
export const initDb = () => {
  return new Promise(resolve => {
    localforage
      .length()
      .then(keyCnt => {
        if (keyCnt === 0) {
          return migrationKeys;
        }

        return localforage.keys().then(keys => {
          const filteredKeys = Object.keys(migrationKeys).filter((k, v) => {
            return !keys.includes(k);
          });

          return _.pick(migrationKeys, filteredKeys);
        });
      })
      .then(data => {
        let promises = [];
        for (const key in data) {
          let value = data[key];
          promises.push(setStoredData(key, value).then(resolve));
        }
        Promise.all(promises).then(resolve);
      });
  });
};

// export const initStore = getCurrentState => {
//   return new Promise(resolve => {
//     initDb().then(() => {
//       localforage.getItem("auth").then(auth => {
//         resolve({
//           ...getCurrentState(),
//           auth: {
//             ...getCurrentState().auth,
//             users: [...getCurrentState().auth.users, ...auth.users],
//             user: {
//               ...getCurrentState().auth.user,
//               ...auth.user
//             }
//           }
//         });
//       });
//     });
//   });
// };

export const getStoredData = (key, callback = () => null) => {
  return new Promise((resolve, reject) =>
    localforage
      .getItem(key)
      .then(value => {
        console.log(value);
        resolve(value);
      })
      .catch(error => {
        console.warn(
          `There was an error retreiving the [${key}] from localstorage`,
          error
        );
        reject(error);
      })
  );
};

export const setStoredData = (key, value) => {
  return new Promise((resolve, reject) =>
    localforage
      .setItem(key, value)
      .then(response => {
        console.log(`[${key}] successfully saved to localstorage`);
        resolve(response);
      })
      .catch(error => {
        const msg = console.log(
          `There was an error saved [${key}] to localstorage. Error: ${error}`
        );
        reject(msg);
      })
  );
};

/**
 * Questions mock requests
 */
mock.onGet("/api/questions").reply(request => {
  if (request.params) {
    const { categoryId } = request.params;

    return getStoredData("categories")
      .then(categories => {
        const category = categories.find(
          _category => _category.value === categoryId
        );

        return category;
      })
      .then(category => {
        return getStoredData("questions").then(_questions => {
          const questions = _questions.filter(
            _question => _question.categoryId === category.id
          );

          return questions;
        });
      })
      .then(questions => {
        return [200, questions];
      });
  }

  return getStoredData("questions").then(questions => {
    return [200, questions];
  });
});

mock.onPost("/api/questions").reply(request => {
  const data = JSON.parse(request.data);
  const question = Helpers.formatQuestion(data);
  getStoredData("questions")
    .then(questions => {
      return [...questions, question];
    })
    .then(data => setStoredData("questions", data));
  return [200, question];
});

mock.onGet("/api/question").reply(request => {
  const { questionId } = request.params;
  return getStoredData("questions").then(questions => {
    const response = _.find(questions, { id: questionId });
    if (!response) {
      return [400, response];
    }
    return [200, response];
  });
});

mock.onPost("/api/question").reply(request => {
  const { questionId, answerId, userId } = request.params;

  return getStoredData("questions")
    .then(questions => {
      const question = _.find(questions, { id: questionId });

      const questionIndex = _.findIndex(questions, { id: questionId });
      const oldVotes = question.answers[answerId].votes.filter(
        value => value !== userId
      );

      const updatedVotes = [...oldVotes, userId];

      const updatedQuestion = {
        ...question,
        answers: {
          ...question.answers,
          [answerId]: {
            ...question.answers[answerId],
            votes: updatedVotes
          }
        }
      };

      const updatedQuestions = [
        ...questions.slice(0, questionIndex),
        {
          ...questions[questionIndex],
          ...updatedQuestion
        },
        ...questions.slice(questionIndex + 1)
      ];

      const response = {
        questions: updatedQuestions,
        question: updatedQuestion
      };

      return response;
    })
    .then(response => {
      const { questions, question } = response;

      setStoredData("questions", questions);

      return [200, question];
    });
});

mock.onGet("/api/questions/categories").reply(request => {
  const { categories } = db;

  if (request.params) {
    const { categoryId } = request.params;
    const category = categories.find(
      _category => _category.value === categoryId
    );

    return [200, category];
  }

  return [200, categories];
});

mock.onGet("/api/questions/category").reply(request => {
  const params = request.config.params;
  const { categoryId } = params;
  const { categories } = db;

  const response = _.find(categories, { value: categoryId });

  return [200, response];
});

/**
 * Users mock requests
 */
mock.onGet("/api/users").reply(request => {
  return getStoredData("users").then(users => {
    if (!users) {
      console.log(
        "No users currently in store or Browser storage. Loading from static db." +
          "If this is an error, check the IndexedDB in your browser storage."
      );
      return [200, db.users];
    }
    return [200, users];
  });
});

mock.onPost("/api/users").reply(request => {
  const user = JSON.parse(request.data);

  return getStoredData("users")
    .then(users => {
      const newUsers = users.map(_user => {
        if (_user.id === user.id) {
          const newUser = _.merge(_user, user);

          return newUser;
        }

        return _user;
      });

      const response =
        newUsers.filter(_user => _user.id === user.id).length > 0
          ? newUsers
          : [...newUsers, user];

      return response;
    })
    .then(response => {
      setStoredData("users", response);
      return [200, response];
    });
});

mock.onPost("/api/user").reply(request => {
  const user = JSON.parse(request.data);

  return getStoredData("user")
    .then(_user => {
      if (_user) {
        const response = { ..._user, ...user };
        console.log("axios updateUser post user1: ", response, _user, user);

        return response;
      }

      return user;
    })
    .then(response => {
      setStoredData("user", response);
      return [200, response];
    });
});

mock.onGet("/api/auth").reply(config => {
  const data = JSON.parse(config.data);
  const { email, password } = data;
  return getStoredData("users").then(users => {
    let user = _.cloneDeep(users.find(_user => _user.data.email === email));

    const error = {
      email: user ? null : "Check your username/email",
      password:
        user && user.password === password ? null : "Check your password"
    };

    if (!error.email && !error.password && !error.displayName) {
      delete user.password;

      const access_token = jwt.sign({ id: user.id }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
      });

      user = {
        ...user,
        access_token: access_token
      };

      const response = {
        user: user,
        access_token: access_token
      };

      setStoredData("user", user);

      return [200, response];
    }
    return [200, { error }];
  });
});

mock.onGet("/api/auth/access-token").reply(config => {
  const data = JSON.parse(config.data);
  const { access_token } = data;
  const { users } = db;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);

    const user = _.cloneDeep(users.find(_user => _user.id === id));

    delete user.password;

    const updatedAccessToken = jwt.sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn
    });

    const response = {
      user: user,
      access_token: updatedAccessToken
    };

    return [200, response];
  } catch (e) {
    const error = "Invalid access token detected";
    console.log("api access_token error", error);
    return [401, { error }];
  }
});

mock.onPost("/api/auth/register").reply(request => {
  const data = JSON.parse(request.data);
  const { displayName, password, email } = data;

  return getStoredData("users").then(users => {
    const isEmailExists = users.find(user => user.data.email === email);

    const error = {
      email: isEmailExists ? "The email is already in use" : null,
      displayName: displayName !== "" ? null : "Enter display name",
      password: null
    };

    if (error.displayName || error.password || error.email) {
      console.log("Axios register error");
      return [401, { error }];
    }

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
  });
});

mock.onGet("/api/auth/logout").reply(request => {
  const { user } = db;

  setStoredData("user", user).then(response => {
    return [200, response];
  });
});
