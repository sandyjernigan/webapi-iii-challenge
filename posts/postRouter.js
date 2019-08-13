const express = 'express';

const router = express.Router();

//#region - CREATE
router.post('/', (req, res) => {

});
//#endregion

//#region - READ
router.get('/', (req, res) => {

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