const express = 'express';
const helmet = require('helmet');
const logger = require('morgan');

// Routers
const PostsRouter = require('./posts/postRouter.js');
const UsersRouter = require('./users/userRouter.js');

const server = express();
// Middleware
server.use(express.json());
server.use(helmet());
server.use(logger('dev'));

// Base Folder
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  // TODO: logger()
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API


};

server.use((error, req, res, next) => {
  res.status(400).json({ 
    message: "Bad Panda!",
    error
  });
});

module.exports = server;
