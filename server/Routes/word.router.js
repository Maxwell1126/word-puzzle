const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const WORDNIK_KEY = process.env.WORDNIK_KEY;

router.get('/', (req, res) => {
    (async () => {
        const client = await pool.connect();
        let isValid = false;
        let justLetters = true;
        try {
            await client.query('BEGIN');
            let wordToGuessCheck = `SELECT * FROM "word_to_guess";`;
            let verifyWordToGuess = await client.query(wordToGuessCheck);
            if (verifyWordToGuess.rows[0].length ){
                res.send(verifyWordToGuess.rows[0])
            }else{
                while(isValid == false){
                    let randomWord = "";
                    await axios({
                        method: 'GET',
                        url: `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=abbreviation%2C%20family-name%2C%20given-name%2C%20idiom%2C%20noun-possessive%2C%20proper-noun%2C%20proper-noun-plural%2C%20contraction&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=2&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${WORDNIK_KEY}`
                    }).then((response) => {
                        
                        for (let i = 0; i < response.body.word; i++){
                            if (response.body.word.charAt(i) == "'" || response.body.word.charAt(i) == "-" ||
                                response.body.word.charAt(i) == ""){
                                    justLetters = false;
                            }
                        }
                        if(justLetters == true){
                            randomWord = response.body.word;
                        }
                        
                    }).catch((error) => {
                        console.log('Error in GET', error);
                    });
                    if(justLetters == true){
                        await axios({
                            method: 'GET',
                            url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${API_KEY}`
                        }).then((response) => {
                            console.log(response.data[0].fl, " ", response.data[0].meta.offensive);

                            if (response.data[0].meta != undefined) {
                                if (response.data[0].meta.offensive == false && response.data[0].fl != "trademark"
                                    && response.data[0].fl != "certification mark" && response.data[0].fl != "service mark"
                                    && response.data[0].fl != "geographical name" && response.data[0].fl != "biographical name"
                                    && response.data[0].fl != "abbreviation" && response.data[0].fl != "contraction"
                                    && response.data[0].fl != "slang") {
                                    
                                    let insertWordQuery = `INSERT INTO "word_to_guess" ("word", "definition") VALUES ($1, $2);`;
                                    let insertWordValue = [req.body.payload.guess, response.data[0].def[0].sseq[0].dt[0]];
                                    client.query(insertWordQuery, insertWordValue);
                                    isValid = true;
                                }
                            }
                        }).catch((error) => {
                            console.log('Error in GET', error);
                        });
                    }
                }
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