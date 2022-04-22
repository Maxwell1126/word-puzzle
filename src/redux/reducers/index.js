import { combineReducers } from 'redux';
import setWordToGuess from './setWordReducer';
import setGuesses from './setGuessReducer';
import buildGuess from './buildGuess';
import setStats from './statsReducer';

const rootReducer = combineReducers({
    setWordToGuess,
    setGuesses,
    buildGuess,
    setStats,
});

export default rootReducer;