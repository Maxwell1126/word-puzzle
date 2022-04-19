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


module.exports = router;