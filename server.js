const express = require('express');
const helmet = require('helmet');
// const morgan = require('morgan');

// Routers
const PostsRouter = require('./posts/postRouter.js');
const UsersRouter = require('./users/userRouter.js');

// Express
const server = express();

// Middleware
server.use(express.json());
server.use(helmet());
server.use(logger);

// Base Folder
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


//custom middleware

function logger(req, res, next) {
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API

  // TimeStamp
  // const timeStamp = Math.floor(Date.now() / 1000);
  const timeStamp = new Date().toUTCString();
  console.log(`Method: ${req.method} URL: ${req.url} Timestamp: ${timeStamp}`);
  next();
};

server.use((error, req, res, next) => {
  res.status(400).json({ 
    message: "Silly Old Bear!",
    error
  });
});

module.exports = server;
