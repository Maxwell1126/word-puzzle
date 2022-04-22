const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');
// const { restart } = require('nodemon');
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
            // if (verifyWordToGuess.rows.length > 0){
            //     res.send(verifyWordToGuess.rows[0].word)
            //     console.log('There is a word to guess')
            // }
            if (verifyWordToGuess.rows.length == 0){
                while(isValid == false){
                    console.log("isValid ", isValid)
                  
                    await axios({
                        method: 'GET',
                        url: `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=abbreviation%2C%20family-name%2C%20given-name%2C%20idiom%2C%20noun-possessive%2C%20proper-noun%2C%20proper-noun-plural%2C%20contraction&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=2&maxDictionaryCount=-1&minLength=5&maxLength=5&api_key=${WORDNIK_KEY}`
                    }).then((response) => {
                        console.log("wordnik response ", response.data.word)
                        for (let i = 0; i < response.data.word.length; i++){
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
                            if (response.data[0].meta != undefined) {
                                console.log("word exists")
                                if (response.data[0].meta.stems[0].charAt(0) != response.data[0].meta.stems[0].charAt(0).toUpperCase() 
                                    && response.data[0].meta.offensive == false && response.data[0].fl != "trademark"
                                    && response.data[0].fl != "certification mark" && response.data[0].fl != "service mark"
                                    && response.data[0].fl != "geographical name" && response.data[0].fl != "biographical name"
                                    && response.data[0].fl != "abbreviation" && response.data[0].fl != "contraction"
                                    && response.data[0].fl != "slang") {
                                        console.log(randomWord)
                                        isValid = true;
                                        console.log("isValid ", isValid); 
                                        return;
                
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
                    await client.query(insertWordQuery, insertWordValue);
                    // let randomWordQuery = `SELECT "word" FROM "word_to_guess";`;
                    // let getRandomWord = await client.query(randomWordQuery);
                    // let theRandomWord = getRandomWord.rows[0].word;
                    // console.log(theRandomWord);
                    await client.query('COMMIT');
                    // res.send(theRandomWord);
                    res.sendStatus(201);
                }
            } else{
                res.sendStatus(200);
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

router.get('/', (req,res) =>{
    function getWord(){
        let randomWord = "";
        pool.query('SELECT "word" FROM "word_to_guess";').then((response) => {
            randomWord = response.rows[0];
            if (randomWord != undefined){
                res.send(response.rows[0].word)
            }else{
                setTimeout(() => { getWord()},  300);
            }   
        });
    }
    getWord();
});

router.delete('/', (req, res) => {
    pool.query('DELETE FROM "word_to_guess";').then((response) => {
     res.sendStatus(200);
    }).catch((error) => {
        console.log('error in server deleting from database.', error);
    });
});

module.exports = router;