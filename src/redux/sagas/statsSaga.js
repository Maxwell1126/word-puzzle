import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function* postRecord(record) {
    try {
        const response = yield axios.put('/stats', record);
    } catch (error) {
        console.log('Error in axios POST (postRecord): ', error);
    }
}



function* statsSaga() {
    yield takeLatest('POST_RECORD', postRecord);

}

export default statsSaga;