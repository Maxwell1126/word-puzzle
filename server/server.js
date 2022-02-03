require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('build'));

const wordsRouter = require('./Routes/words.router');

app.use('/words', wordsRouter);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});