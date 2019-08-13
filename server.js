const express = 'express';

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  // TODO: logger()
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API


};

module.exports = server;
