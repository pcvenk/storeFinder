const express = require('express');
const router  = express.Router();
const geoCoder = require('node-geocoder');

//nodegeocoder
const options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyDcww5_qOHGBkILjww189-1DTv2MBMkeE4', // for Mapquest, OpenCage, Google Premier
    formatter: null         // 'gpx', 'string', ...
};

const geocoder = geoCoder(options);

//Show route
router.get('/', (req, res) => {
   res.render('search-store');
});

//New store route
router.get('/addstore', (req, res) => {
    res.render('add-store');
});

//Add store route
router.post('/store/add', (req, res) => {
    const id = req.body.id;
    const loc = req.body.location;

    geocoder.geocode(loc)
        .then((res) => {
            console.log(res);
            return;
        })
        .catch((err) => {
            console.log(err);
            return;
        });
});


module.exports = router;