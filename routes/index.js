const express = require('express');
const router  = express.Router();

//Show route
router.get('/', (req, res) => {
   res.render('search-store');
});

//New store route
router.get('/addstore', (req, res) => {
    res.render('add-store');
});


module.exports = router;