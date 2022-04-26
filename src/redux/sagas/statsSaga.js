import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function* postRecord(record) {
    try {
       yield axios.post('/stats', record);

     
        const getStats = {type:'GET_STATS', payload:'puzzle'};
        yield put(getStats);

        
    } catch (error) {
        console.log('Error in axios POST (postRecord): ', error);
    }
}

function* getStats(action){
    console.log(action)
    try{
        const response = yield axios.get('/stats');
        if(action.payload== 'home'){
            const setStatsRequest = { type: 'SET_STATS_MULTI', payload: response.data };
            yield put(setStatsRequest);
        }else if(action.payload == 'puzzle'){
            const setStatsRequest = { type: 'SET_STATS_ONCE', payload: response.data };
            yield put(setStatsRequest);
        }
        // const setStatsRequest = { type: 'SET_STATS', payload: response.data};
        // yield put(setStatsRequest);

    } catch (error) {
        console.log('Error in axios GET (getStats): ', error);
    }
}

function* statsSaga() {
    yield takeLatest('POST_RECORD', postRecord);
    yield takeLatest('GET_STATS', getStats);
}

export default statsSaga;