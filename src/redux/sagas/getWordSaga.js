import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getWord(word) {
    try {
        const response = yield axios.get('/word');
        const getLatest = { type: 'SET_WORD', payload: response.data }
        yield put(getLatest);
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
function* getWordSaga() {
    yield takeLatest('GET_WORD', getWord);
    yield takeLatest('POST_WORD', postWord);
}

export default getWordSaga;