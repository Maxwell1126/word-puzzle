import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getGuess(guess) {
    try {
        //const response = yield axios.get('/');
        const getLatest = { type: 'SET_GUESS', payload:"" }
        yield put(getLatest);
    } catch (error) {
        console.log('Error in axios GET:', error);
    }
}

function* getGuessSaga() {
    yield takeLatest('GET_GUESS', getGuess);
}

export default getGuessSaga;