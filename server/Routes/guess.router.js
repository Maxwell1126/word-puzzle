const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;



router.post('/', (req, res) => {
    
    console.log("TTHE REQQY ", req.body.payload);
    (async () => {
        let isValid = true;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await  axios({
                    method: 'GET',
                    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.body.payload}?key=${API_KEY}`
                }).then((response) => {
                    if (response.data[0].meta != undefined){
                        isValid = true;
                        let insertGuessQuery = `INSERT INTO "guess_list" ("guess") VALUES ($1);`;
                        let insertGuessQueryValue = [req.body.payload];
                        client.query(insertGuessQuery, insertGuessQueryValue);
                    }else{
                        isValid = false;
                    }
                    
                }).catch((error) => {
                    console.log('Error in GET', error);
                    res.sendStatus(500);
                });
            
            await client.query('COMMIT');
            if(isValid == true){
               return res.sendStatus(200);
            }else{
               return res.sendStatus(204);
            }
            
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

router.get('/', (req, res) => {
    console.log('in get')
    let guessList = `SELECT COUNT(*) FROM "guess_list";`;
    pool.query(guessList).then((response) => {
        if (response.rows.length) {
            res.send(response.rows)
        } else {
            console.log('in goose egg')
            let gooseEgg = 0;
            res.send(gooseEgg);
        }
    }).catch((error) => {
        console.log('error in server getting from database.', error);
    })
})
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