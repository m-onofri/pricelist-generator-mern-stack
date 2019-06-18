const express = require ('express');
const router = express.Router();

//@route GET /
//@desc test route
//@access Public

router.get('/', (req, res) => res.send('test route'));

module.exports = router;