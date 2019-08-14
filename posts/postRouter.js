const express = require('express');
const router = express.Router();
// Database
const DB = require('./postDb.js');

//#region - CREATE
router.post('/', (req, res) => {

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
//#endregion

module.exports = router;