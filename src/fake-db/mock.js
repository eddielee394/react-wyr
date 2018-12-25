const MockAdapter = require("axios-mock-adapter");
const axios = require("axios");

// const mock = new MockAdapter(axios, { delayResponse: 5000 });
const mock = new MockAdapter(axios);
export default mock;
