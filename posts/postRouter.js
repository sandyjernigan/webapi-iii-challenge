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

router.get('/:id', (req, res) => {

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

function validatePostId(req, res, next) {

};
//#endregion

module.exports = router;