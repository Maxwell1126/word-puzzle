require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
let cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));

const guessRouter = require('./Routes/guess.router');
const wordRouter = require('./Routes/word.router');

app.use('/guess', guessRouter);
app.use('/word', wordRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});