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
                    res.sendStatus(200);
                }else{
                    res.sendStatus(204);
                }
            }
            await client.query('COMMIT');
            
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
            let statsObject = {total: 0, first: 0, second: 0, third: 0, fourth: 0, fifth: 0, sixth: 0, winPercent: 0, streak: 0, best:0};

            let getAllGamesQuery = `SELECT COUNT(*) FROM "record";`;
            let getAllGames = await client.query(getAllGamesQuery);
            let totalGames = 0;
            if (getAllGames.rows.length){
                totalGames = parseInt(getAllGames.rows[0].count);
                statsObject.total = totalGames;
            }

            for(let i =1; i < 7; i++){
                let placeGuessQuery = `SELECT COUNT(*) FROM "record" WHERE "round" = $1 AND "win" = TRUE;`;
                let placeGuessValue = [i];
                let placeGuess = await client.query(placeGuessQuery, placeGuessValue);
                if(placeGuess.rows.length){
                    let placeCount = parseInt(placeGuess.rows[0].count);
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
            };

            let getAllWinsQuery = `SELECT COUNT(*) FROM "record" WHERE "win" = TRUE;`;
            let getAllWins = await client.query(getAllWinsQuery);
            if (getAllWins.rows.length){
                let totalWins = parseInt(getAllWins.rows[0].count);
                let percentWon = (totalWins / totalGames).toFixed(2) * 100;
                statsObject.winPercent = percentWon;
            }

            let getTotalGamesIDQuery = `SELECT "id" FROM "record" ORDER BY "id" DESC LIMIT 1;`;
            let getTotalGamesID = await client.query(getTotalGamesIDQuery);
            let totalGamesID = 0;
            if (getTotalGamesID.rows.length){
                totalGamesID = parseInt(getTotalGamesID.rows[0].id);
            };
            let getLatestLossQuery = `SELECT "id" FROM "record" WHERE "win" = FALSE ORDER BY "id" DESC LIMIT 1;`;
            let getLatestLoss = await client.query(getLatestLossQuery);
            let latestLoss = 0;
            if(getLatestLoss.rows.length){
                latestLoss = parseInt(getLatestLoss.rows[0].id);
            };
            let currentStreak = totalGamesID - latestLoss;
            statsObject.streak = parseInt(currentStreak);

            let selectAllRecordsQuery = `SELECT * FROM "record" ORDER BY "id";`;
            let selectAllRecords = await client.query(selectAllRecordsQuery);
            let bestStreakCounter = 0;
            let currentStreakCounter = 0;
            for (let i = 0; i < selectAllRecords.rows.length; i++){
                if (selectAllRecords.rows[i].win == true && i != selectAllRecords.rows.length-1){
                    currentStreakCounter++;
                } else if (selectAllRecords.rows[i].win == true && i == selectAllRecords.rows.length - 1) {
                    currentStreakCounter++;
                    if (currentStreakCounter > bestStreakCounter) {
                        bestStreakCounter = currentStreakCounter;
                    };
                    currentStreakCounter = 0;
                } else if (selectAllRecords.rows[i].win == false){
                    if (currentStreakCounter > bestStreakCounter){
                        bestStreakCounter = currentStreakCounter;
                    };
                    currentStreakCounter = 0;
                };
            };
            statsObject.best = parseInt(bestStreakCounter);

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