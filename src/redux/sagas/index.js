import { all } from 'redux-saga/effects';
import getWord from './getWordSaga';
import getGuess from './currentGuess';
export default function* rootSaga() {
    yield all([
        getWord(),
    ]);
}       