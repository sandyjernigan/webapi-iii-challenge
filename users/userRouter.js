const express = require('express');
const router = express.Router();
// Database
const DB = require('./userDb.js');
const PostDB = require('../posts/postDb.js');

//#region - CREATE
// Creates a user using the information sent inside the request body.
router.post('/', validateUser, async (req, res) => {
  try {
    // `insert()`: calling insert passing it a `resource` object will add it to the database and return the new `resource`.
    const insertResults = await DB.insert(req.body);
    const results = await DB.getById(insertResults.id);

    // check that post was added
    if (results) {
      res.status(201).json(results); // return HTTP status code 201 (Created)
    } else {
      next({ code: 404, message: "There was an error while saving the user." });
    }

  } catch (error) {
    // If there's an error while saving the post:
    console.log(error);
    next({ code: 500, message: "There was an error while saving the user to the database." });
  }
});

// Creates a post for the user with the specified id.
router.post('/:id/posts', [validateUserId, validatePost], async (req, res) => {
  try {
    const reqInfo = {...req.body, user_id: req.params.id}

    // `insert()`: calling insert passing it a `resource` object will add it to the database and return the new `resource`.
    const insertResults = await PostDB.insert(reqInfo);
    const results = await PostDB.getById(insertResults.id);

    // check that post was added
    if (results) {
      res.status(201).json(results); // return HTTP status code 201 (Created)
    } else {
      next({ code: 404, message: "There was an error while saving the post." });
    }

  } catch (error) {
    // If there's an error while saving the post:
    console.log(error);
    next({ code: 500, message: "There was an error while saving the post to the database." });
  }

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
router.put('/:id', [validateUserId, validateUser], async (req, res) => {
  try {
    // `update()`: accepts two arguments, the first is the `id` of the `resource` to update 
    // and the second is an object with the `changes` to apply. 
    // It returns the count of updated records. If the count is 1 it means the record was updated correctly.
    const updateResults = await DB.update(req.params.id, req.body);
    if (updateResults) {
      const results = await DB.findById(req.params.id);
      res.status(200).json(results);
    } else {
      next({ code: 404, message: "The user could not be found." });
    }
  } catch (error) {
    // If there's an error when updating the post:
    console.log(error);
    next({ code: 500, message: "The user information could not be modified." });
  }

});
//#endregion

//#region - DELETE
router.delete('/:id', validateUserId, async (req, res) => {
  try {
    const results = await DB.findById(req.params.id);
    // `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the `resource` from the database, returns the number of records deleted.
    const deleteResults = await DB.remove(req.params.id);
    if (deleteResults > 0) {
      res.status(200).json({ results, message: 'Delete user was successful.' });
    } else {
      next({ code: 404, message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    next({ code: 500, message: "The user could not be removed." });
  }
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
      next({ code: 400, message: "Invalid User ID" });
    } else {
      req.user = results;
      next();
    }
  } catch (error) {
    // If there's an error in retrieving the post from the database:
    console.log(error);
    next({ code: 500, message: "The user information could not be retrieved." });
  }
};

function validateUser(req, res, next) {
  const { body } = req

  if (req.body && Object.keys(req.body).length > 0) {
    if (req.body.name) {
      req.body = body;
      next();
    } else {
      next({ code: 400, message: "Request is missing required name field." });
    }
  } else {
      next({ code: 400, message: "Request is missing user data." });
  }
};

function validatePost(req, res, next) {
  const { body } = req

  if (req.body && Object.keys(req.body).length > 0) {
    if (!req.body.text) {
      next({ code: 400, message: "Request is missing required text field." })
    } else {
      req.body = body;
      next();
    }
  } else {
      next({ code: 400, message: "Request is missing post data." });
  }
};
//#endregion

module.exports = router;
