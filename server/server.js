require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));

const guessRouter = require('./Routes/guess.router');

app.use('/guess', guessRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});