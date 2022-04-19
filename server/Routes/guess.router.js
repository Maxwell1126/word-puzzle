const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;

router.put('/', (req, res) => {

    console.log("TTHE REQQY ", req.body.payload);
    (async () => {
        let isValid = false;
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
                await axios({
                    method: 'GET',
                    url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${req.body.payload.guess}?key=${API_KEY}`
                }).then((response) => {
                    console.log(response.data[0].fl, " ",response.data[0].meta.offensive);
    
                if (response.data[0].meta != undefined) {
                    if (response.data[0].meta.offensive == false && response.data[0].fl != "trademark" 
                        && response.data[0].fl != "certification mark" && response.data[0].fl !="service mark" 
                        && response.data[0].fl != "geographical name" && response.data[0].fl != "biographical name" 
                        && response.data[0].fl != "abbreviation" && response.data[0].fl != "contraction"
                        && response.data[0].fl != "slang"){
                            isValid = true;
                            let insertGuessQuery = `UPDATE "guess_list" SET "guess"=$1 WHERE "id" = $2;`;
                            let insertGuessQueryValue = [req.body.payload.guess, req.body.payload.id];
                            client.query(insertGuessQuery, insertGuessQueryValue);
                    }
                }
            
            }).catch((error) => {
                console.log('Error in GET', error);

            });
        
            await client.query('COMMIT');
            console.log("isValid ", isValid)
            if (isValid == true) {
                console.log("200")
                return res.sendStatus(200);
            } else {
                console.log("204")
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
                    
                });
            
            await client.query('COMMIT');
            console.log("isValid ", isValid)
            if(isValid == true){
                console.log("200")
               return res.sendStatus(200);
            }else{
                console.log("204")
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
    let guessList = `SELECT * FROM "guess_list" ORDER BY "id";`;
    pool.query(guessList).then((response) => {
        console.log(response.rows.length)
        if (response.rows.length) {
            let guesses = [];
            for (let i = 0; i < response.rows.length; i++){
                guesses.push(response.rows[i].guess);
            }
            console.log(guesses)
            res.send(guesses)
        } else {
            console.log('in goose egg')
            let gooseEgg = [];
            res.send(gooseEgg);
        }
    }).catch((error) => {
        console.log('error in server getting from database.', error);
    })
})

router.put('/reset', (req,res) => { 
    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            for(let i = 1; i < 7; i ++){
                let resetGuessQuery = `UPDATE "guess_list" SET "guess"='' WHERE "id" = $1`;
                let resetGuessValue = [i];
                client.query(resetGuessQuery, resetGuessValue);
            }
            res.sendStatus(200);
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