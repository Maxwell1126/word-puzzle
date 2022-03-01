import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function* postGuess(guess) {
    try {
        console.log("in post: ", guess.payload)
        yield axios.post('/guess', guess);
        const getGuesses = { type: 'GET_GUESSES' }
        yield put(getGuesses);
    } catch (error) {
        console.log('Error in axios POST (postGuess): ', error);
    }
}

function* getGuesses(action) {
    try {
        console.log('in get')
        const response = yield axios.get('/guess');
        console.log("response ", response.data);
        const guesses = { type: 'SET_GUESSES', payload: response.data };
        yield put(guesses);
    } catch (error) {
        console.log('Error in axios get', error);
    }
}

function* getGuessSaga() {
    yield takeLatest('POST_GUESS', postGuess);
    yield getGuesses('GET_GUESSES', getGuesses);
}

export default getGuessSaga;