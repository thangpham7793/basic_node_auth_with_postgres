const app = require("../app");
const request = require("supertest");
const api = request(app);

module.exports = { api };
