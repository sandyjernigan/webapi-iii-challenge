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
router.put('/:id', (req, res) => {

});
//#endregion

//#region - DELETE
router.delete('/:id', (req, res) => {

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