const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
const API_KEY = process.env.API_KEY;
const WORDNIK_KEY = process.env.WORDNIK_KEY;

router.post('/', (req, res) => {
    (async () => {
        const client = await pool.connect();
        let isValid = false;
        let justLetters = true;
        let randomWord = "";
        try {
            await client.query('BEGIN');
            let wordToGuessCheck = `SELECT * FROM "word_to_guess";`;
            let verifyWordToGuess = await client.query(wordToGuessCheck);
            console.log('length ', verifyWordToGuess.rows.length)
            if (verifyWordToGuess.rows.length > 0){
                res.send(verifyWordToGuess.rows[0].word)
                console.log('There is a word to guess')
            }else{
                while(isValid == false){
                    console.log("isValid ", isValid)
                    
                    await axios({
                        method: 'GET',
                        url: `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=abbreviation%2C%20family-name%2C%20given-name%2C%20idiom%2C%20noun-possessive%2C%20proper-noun%2C%20proper-noun-plural%2C%20contraction&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=2&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${WORDNIK_KEY}`
                    }).then((response) => {
                        console.log("wordnik response ", response.data.word)
                        for (let i = 0; i < response.data.word; i++){
                            if (response.data.word.charAt(i) == "'" || response.data.word.charAt(i) == "-" ||
                                response.data.word.charAt(i) == "." || response.data.word.charAt(i) == " "){
                                    justLetters = false;
                                    console.log("there arent just letters")
                            }
                        }
                        if(justLetters == true){
                            randomWord = response.data.word;
                            console.log("randomWord ", randomWord)
                        }       
                    }).catch((error) => {
                        console.log('Error in GET', error);
                    });
                    if(justLetters == true){
                        console.log("just letters is true")
                        let apiResponse;
                        await axios({
                            method: 'GET',
                            url: `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${randomWord}?key=${API_KEY}`
                        }).then((response) => {
                            apiResponse = response;
                            console.log(response.data[0].fl, " ", response.data[0].meta.offensive);
                            console.log(response.data[0].def[0].sseq[0][0][1].dt)
                            console.log( "BREAK")
                            console.log(response.data[0].def[0].sseq[0][0][1].dt[0])
                            if (response.data[0].meta != undefined) {
                                console.log("word exists")
                                if (response.data[0].meta.offensive == false && response.data[0].fl != "trademark"
                                    && response.data[0].fl != "certification mark" && response.data[0].fl != "service mark"
                                    && response.data[0].fl != "geographical name" && response.data[0].fl != "biographical name"
                                    && response.data[0].fl != "abbreviation" && response.data[0].fl != "contraction"
                                    && response.data[0].fl != "slang") {
                                        console.log(randomWord)
                                        isValid = true;
                                        console.log("isValid ",isValid);    
                                }
                            }
                        }).catch((error) => {
                            console.log('Error in GET', error);
                        });
                        
                    }
                }
                if (isValid == true) {
                    console.log("The random word ",randomWord);
                    let insertWordQuery = `INSERT INTO "word_to_guess" ("word") VALUES ($1);`;
                    let insertWordValue = [randomWord];
                   let insertRandomWord = await client.query(insertWordQuery, insertWordValue);
                    let randomWordQuery = `SELECT "word" FROM "word_to_guess";`;
                    let getRandomWord = await client.query(randomWordQuery);
                    let theRandomWord = getRandomWord.rows[0].word;
                    console.log(theRandomWord);
                    await client.query('COMMIT');
                    res.send(theRandomWord);
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