const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
  // TODO: validateUserId()
  // validateUserId validates the user id on every request that expects a user id parameter
  // if the id parameter is valid, store that user object as req.user
  // if the id parameter does not match any user id in the database, cancel the request and respond with status 400 and { message: "invalid user id" }

};

function validateUser(req, res, next) {
  // TODO: validateUser()
  // validateUser validates the body on a request to create a new user
  // if the request body is missing, cancel the request and respond with status 400 and { message: "missing user data" }
  // if the request body is missing the required name field, cancel the request and respond with status 400 and { message: "missing required name field" }


};

function validatePost(req, res, next) {
  // TODO: validatePost()
  // validatePost validates the body on a request to create a new post
  // if the request body is missing, cancel the request and respond with status 400 and { message: "missing post data" }
  // if the request body is missing the required text field, cancel the request and respond with status 400 and { message: "missing required text field" }
};

module.exports = router;
