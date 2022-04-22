import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function* postRecord(record) {
    try {
        yield axios.post('/stats', record);
    } catch (error) {
        console.log('Error in axios POST (postRecord): ', error);
    }
}

function* getStats(){
    try{
        let getStatsQuery = yield axios.get('/stats');
        let stats = getStatsQuery.response;
        yield put('SET_STATS', stats);

    } catch (error) {
        console.log('Error in axios GET (getStats): ', error);
    }
}

function* statsSaga() {
    yield takeLatest('POST_RECORD', postRecord);
    yield takeLatest('GET_STATS', getStats);
}

export default statsSaga;