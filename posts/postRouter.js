const express = require('express');
const router = express.Router();
// Database
const DB = require('./postDb.js');

//#region - CREATE
// Creates a post using the information sent inside the request body. 
router.post('/', validatePost, async (req, res) => {
  try {
    // `insert()`: calling insert passing it a `resource` object will add it to the database and return the new `resource`.
    const insertResults = await DB.insert(req.body);
    const results = await DB.getById(insertResults.id);

    // check that post was added
    if (results) {
      res.status(201).json(results); // return HTTP status code 201 (Created)
    } else {
      next({ code: 404, message: "There was an error while saving the post." });
    }
  } catch (error) {
    console.log(error);
    next({ code: 500, message: "There was an error while saving the post to the database. Please make sure you submitted an active user." });
  }
});
//#endregion

//#region - READ
// Read All - Returns an array of all the posts
router.get('/', async (req, res) => {
  try {
    // `get()`: calling find returns a promise that resolves to an array of all the `resources` contained in the database.
    const results = await DB.get();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

// Read by ID - Returns the post object with the specified id.
router.get('/:id', validatePostId, (req, res) => {
  res.status(200).json(req.results);
});
//#endregion

//#region - UPDATE
// 	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', validatePostId, async (req, res) => {
  try {
    // If the request body is missing the contents:
    if (!req.body.text) {
      next({ code: 400, message: "Request is missing required text field." })
    } else {
      // `update()`: accepts two arguments, the first is the `id` of the `resource` to update 
      // and the second is an object with the `changes` to apply. 
      // It returns the count of updated records. If the count is 1 it means the record was updated correctly.
      const updateResults = await DB.update(req.params.id, req.body);
      if (updateResults) {
        const results = await DB.getById(req.params.id);
        res.status(200).json(results); // return HTTP status code 200 (OK) and the newly updated post.
      } else {
        next({ code: 404, message: "The post could not be found." });
      }
    }
  } catch (error) {
    // If there's an error when updating the post:
    console.log(error);
    next({ code: 500, message: "The post information could not be modified." });
  }
});
//#endregion

//#region - DELETE
router.delete('/:id', validatePostId, async (req, res) => {
  try {
    const results = await DB.getById(req.params.id);
    // `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the `resource` from the database, returns the number of records deleted.
    const deleteResults = await DB.remove(req.params.id);
    if (deleteResults > 0) {
      res.status(200).json({ results, message: 'Delete post was successful.' });
    } else {
      next({ code: 404, message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    next({ code: 500, message: "The post could not be removed." });
  }
});
//#endregion

//#region - Custom Middleware

async function validatePostId(req, res, next) {
  const { id } = req.params
  try {
    // `getById()`: takes an `id` as the argument and returns a promise that resolves to the `resource` with that id if found.
    const results = await DB.getById(id);

    // If the post with the specified id is not found:
    if (!results || Object.keys(results).length === 0) {
      res.status(404).json({ // 404: Not Found
        message: "The post with the specified ID does not exist."
      });
    } else {
      req.results = results;
      next();
    }
  } catch (error) {
    // If there's an error in retrieving the post from the database:
    console.log(error);
    res.status(500).json({ // respond with HTTP status code 500 (Server Error).
      error: "The post information could not be retrieved."
    });
  }
};

function validatePost(req, res, next) {
  const { body } = req

  if (req.body && Object.keys(req.body).length > 0) {
    if (!req.body.text) {
      next({ code: 400, message: "Request is missing required text field." })
    } else if (!req.body.user_id) {
      next({ code: 400, message: "Request is missing required user field." })
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