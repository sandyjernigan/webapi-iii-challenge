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

// Read by ID - Returns the user object with the specified id.
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// Read Posts - Returns an array of all the posts associated with the user with a specified id.
router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    // `getUserPosts()` that when passed a user's `id`, returns a list of all the `posts` for the `user`.
    if(req.user) { // user found, check for posts
      const results = await DB.getUserPosts(req.params.id);
      if (!results) {
        res.status(404).json({ // 404: Not Found
          message: "No posts found."
        });
      } else { // (else) return comments
        res.status(200).json(results);
      }
    }
  } catch (error) {
    // If there's an error in retrieving the comments from the database
    console.log(error);
    res.status(500).json({ // respond with HTTP status code 500 (Server Error).
      error: "Information could not be retrieved.",
    });
  }
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

async function validateUserId(req, res, next) {
  const { id } = req.params
  try {
    // `getById()`: takes an `id` as the argument and returns a promise that resolves to the `resource` with that id if found.
    const results = await DB.getById(id);

    // If the post with the specified id is not found:
    if (!results || Object.keys(results).length === 0) {
      res.status(400).json({
        message: "Invalid User ID"
      });
    } else {
      req.user = results;
      next();
    }
  } catch (error) {
    // If there's an error in retrieving the post from the database:
    console.log(error);
    res.status(500).json({ // respond with HTTP status code 500 (Server Error).
      error: "The user information could not be retrieved."
    });
  }
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
