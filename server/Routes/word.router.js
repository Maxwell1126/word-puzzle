const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const WORDNIK_KEY = process.env.WORDNIK_KEY;

router.get('/', (req, res) => {
    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            let wordToGuessCheck = `SELECT * FROM "word_to_guess";`;
            let verifyWordToGuess = await client.query(wordToGuessCheck);
            if (verifyWordToGuess.rows[0].length ){
                res.send(verifyWordToGuess.rows[0])
            }else{


                

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
})


module.exports = router;