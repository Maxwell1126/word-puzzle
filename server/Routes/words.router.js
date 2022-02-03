const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const BASE_URL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/?key=${API_KEY}`;

router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: `${BASE_URL}`
    }).then((response) => {
        console.log(response.data);
        res.send(response.data);
    }).catch((error) => {
        console.log('Error in GET', error);
        res.sendStatus(500);
    });
});

module.exports = router;