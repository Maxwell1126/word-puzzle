import { combineReducers } from 'redux';
import setWordToGuess from './setWordReducer';

const rootReducer = combineReducers({
    setWordToGuess,
});

export default rootReducer;