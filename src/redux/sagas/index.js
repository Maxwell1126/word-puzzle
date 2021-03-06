import { all } from 'redux-saga/effects';
import getWordSaga from './getWordSaga';
import getGuessSaga from './currentGuess';
import statsSaga from './statsSaga';
export default function* rootSaga() {
    yield all([
        getWordSaga(),
        getGuessSaga(),
        statsSaga(),
    ]);
}       