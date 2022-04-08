const express = require('express');
const pool = require('../pool');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
   let insertQuery = `INSERT INTO "record" ("round", "win") VALUES($1, $2);`;
   let insertValues = [req.body.payload.round, req.body.payload.win];
   pool.query(insertQuery, insertValues).then((response) =>{
       res.sendStatus(200);
   }).catch((error) => {
       console.log('error in server posting to database.', error);
       res.sendStatus(500);
   });
})


module.exports = router;