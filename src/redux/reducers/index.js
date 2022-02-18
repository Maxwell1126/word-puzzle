import { combineReducers } from 'redux';
import setWordToGuess from './setWordReducer';
import setGuess from './setGuessReducer';

const rootReducer = combineReducers({
    setWordToGuess,
    setGuess,
});

export default rootReducer;