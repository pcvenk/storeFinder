const express  = require('express');
const router   = express.Router();
const geoCoder = require('node-geocoder');
const client   = require('../redis-client/client');

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
        .then((response) => {
            const store = {
                lat: response[0].latitude,
                lng: response[0].longitude,
                address: response[0].formattedAddress,
                streetName: response[0].streetName,
                streetNumber: response[0].streetNumber,
                country: response[0].country,
                zipcode: response[0].zipcode
            };

            console.log(store);

            // console.log(store);
            //saving to redis
            client.hmset(id, ['lat', store.lat, 'lng', store.lng, 'address', store.address, 'streetName', store.streetName, 'streetNumber', store.streetNumber, 'country', store.country, 'zipcode', store.zipcode], (err, reply) => {
                if(err){
                    console.log(err);
                } else {
                    console.log(reply);
                    res.redirect('/');
                }
            });

        })
        .catch((err) => {
            console.log(err);
            return;
        });
});

//Search store
router.post('/', (req, res) => {
    const id = req.body.id;

    client.hgetall(id, (err, store) => {
        if(!store){
            res.render('search-store', {error: "Invalid store ID"});
        } else {
            store.id = id;
            res.render('details', {store: store});
        }
    })
});

//Delete route
router.delete('/store/delete/:id', (req, res) => {
    client.del(req.params.id);
    res.redirect('/');
});


module.exports = router;