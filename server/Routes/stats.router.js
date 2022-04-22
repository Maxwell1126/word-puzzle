const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {

    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            getWordIdQuery = `SELECT "id" FROM "word_to_guess";`;
            let executeGetWordID = await client.query(getWordIdQuery);
            if (executeGetWordID.rows[0]){
                let wordId = executeGetWordID.rows[0].id;
                let checkRecordQuery = `SELECT * FROM "record" WHERE "game_id" = ($1)`;   
                let checkRecordWordId = [wordId];
                let executeCheckRecord = await client.query(checkRecordQuery, checkRecordWordId);
                if(executeCheckRecord.rows[0] == undefined){
                    console.log('here')
                    let insertQuery = `INSERT INTO "record" ("game_id", "round", "win") VALUES($1, $2, $3);`;
                    let insertValues = [wordId, req.body.payload.round, req.body.payload.win];
                    await client.query(insertQuery, insertValues);
                }
            }
            await client.query('COMMIT');
            res.sendStatus(200);
        }catch (e) {
            console.log('ROLLBACK', e);
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    })().catch((error) => {
            console.log('error in server posting to database.', error);
            res.sendStatus(500);
    });
});

router.get('/', (req, res)=>{
    (async () => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            let statsObject = {total: '', first: '', second: '', third: '', fourth: '', fifth: '', sixth: '', winPercent: '', streak: ''};

            let getAllGamesQuery = `SELECT COUNT(*) FROM "record";`;
            let getAllGames = await client.query(getAllGamesQuery);
            let totalGames = getAllGames.rows[0];
            statsObject.total = totalGames;

            for(let i =1; i < 7; i++){
                let placeGuessQuery = `SELECT COUNT(*) FROM "record" WHERE "round" = $1;`;
                let placeGuessValue = i;
                let placeGuess = await client.query(placeGuessQuery, placeGuessValue);
                let placeCount = placeGuess.rows[0];
                if(i==1){
                    statsObject.first=placeCount;
                }else if(i==2){
                    statsObject.second = placeCount;
                } else if (i == 3) {
                    statsObject.third = placeCount;
                } else if (i == 4) {
                    statsObject.fourth = placeCount;
                } else if (i == 5) {
                    statsObject.fifth= placeCount;
                } else if (i == 6) {
                    statsObject.sixth = placeCount;
                };
            };

            let getAllWinsQuery = `SELECT COUNT(*) FROM "record" WHERE "win" = TRUE;`;
            let getAllWins = await client.query(getAllWinsQuery);
            let totalWins = getAllWins.rows[0];
            let percentWon = totalWins/totalGames;
            statsObject.winPercent = percentWon;

            let getTotalGamesIDQuery = `SELECT "id" FROM "record" ORDER BY "id" DESC LIMIT 1;`;
            let getTotalGamesID = await client.query(getTotalGamesIDQuery);
            let totalGamesID = getTotalGamesID.rows[0];
            let getLatestLossQuery = `SELECT "id" FROM "record" WHERE "win" = FALSE ORDER BY "id" DESC LIMIT 1;`;
            let getLatestLoss = await client.query(getLatestLossQuery);
            let latestLoss = 0;
            if(getLatestLoss.rows[0].length){
                latestLoss = getLatestLoss.rows[0];
            };
            let currentStreak = totalGamesID - latestLoss;
            statsObject.streak = currentStreak;

            res.send([statsObject]);
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
    });
});

module.exports = router;