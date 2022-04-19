import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getWord(word) {
    try {
        const response = yield axios.get('/word');
        const getLatest = { type: 'SET_WORD', payload: response.data }
        yield put(getLatest);
        // const resetGuesses = { type: 'RESET_GUESSES'};
        // yield put(resetGuesses);
    } catch (error) {
        console.log('Error in axios GET:', error);
    }
}
function* postWord(word) {
    try {
        yield axios.post('/word', null);
        const getLatest = { type: 'GET_WORD' }
        yield put(getLatest);
    } catch (error) {
        console.log('Error in axios GET:', error);
    }
}

function* deleteWord(word) {
    try {
        yield axios.delete('/word');
        const newWord = { type: 'POST_WORD'}
        yield put(newWord);
       
    } catch (error) {
        console.log('Error in axios DELETE:', error);
    }
}

function* getWordSaga() {
    yield takeLatest('GET_WORD', getWord);
    yield takeLatest('POST_WORD', postWord);
    yield takeLatest( 'DELETE_WORD', deleteWord);
}

export default getWordSaga;