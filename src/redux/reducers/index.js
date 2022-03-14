import { combineReducers } from 'redux';
import setWordToGuess from './setWordReducer';
import setGuesses from './setGuessReducer';
import buildGuess from './buildGuess';

const rootReducer = combineReducers({
    setWordToGuess,
    setGuesses,
    buildGuess,
    

});

export default rootReducer;