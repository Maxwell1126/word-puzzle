const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;



router.post('/', (req, res) => {
    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            let isValidWord =  
                axios({
                    method: 'GET',
                    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.body}?key=${API_KEY}`
                }).then((response) => {
                    console.log(response.data);
                }).catch((error) => {
                    console.log('Error in GET', error);
                    res.sendStatus(500);
                });
            await isValidWord;
            if(isValidWord.response.data){
                let insertGuessQuery = `INSERT INTO "guess_list" ("guess") VALUES ($1);`;
                let insertGuessQueryValue = response.data.meta.id;
                await client.query(insertGuessQuery, insertGuessQueryValue);
            }
            await client.query('COMMIT');
            res.sendStatus(201);
        } catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    })().catch((error) => {
        console.log('error in server posting to database.', error);
        res.sendStatus(500);
    })
});


// router.post('/', (req, res) => {
//     axios({
//         method: 'GET',
//         url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.body}?key=${API_KEY}`
//     }).then((response) => {
//         console.log(response.data);
//         res.send(response.data);
//     }).catch((error) => {
//         console.log('Error in GET', error);
//         res.sendStatus(500);
//     });
// });

module.exports = router;