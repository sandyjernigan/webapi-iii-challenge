const express = require('express');
const router = express.Router();
// Database
const DB = require('./userDb.js');

//#region - CREATE
router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});
//#endregion

//#region - READ
// Read All - Returns an array of all the users
router.get('/', async (req, res) => {
  try {
    // `get()`: calling find returns a promise that resolves to an array of all the `resources` contained in the database.
    const results = await DB.get();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The users information could not be retrieved." });
  }
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});
//#endregion

//#region - UPDATE
router.put('/:id', (req, res) => {

});
//#endregion

//#region - DELETE
router.delete('/:id', (req, res) => {

});
//#endregion

//#region - Custom Middleware

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
//#endregion

module.exports = router;
