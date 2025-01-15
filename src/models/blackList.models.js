const { token } = require("morgan");

const blackList = new Set();

module.exports = {
  addToken: (token) => blackList.add(token),
  isTokenBlackListed: (token) => blackList.has(token),
};
