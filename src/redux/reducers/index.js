import { combineReducers } from 'redux';
import setWordToGuess from './setWordReducer';
import setGuesses from './setGuessReducer';

const rootReducer = combineReducers({
    setWordToGuess,
    setGuesses,
});

export default rootReducer;