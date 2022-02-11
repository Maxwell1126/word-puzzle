import { all } from 'redux-saga/effects';
import getWord from './getWordSaga';

export default function* rootSaga() {
    yield all([
        getWord(),
    ]);
}       