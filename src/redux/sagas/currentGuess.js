import { put, take, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';


function* postGuess(guess) {
    try {

       const response =  yield axios.put('/guess', guess);

        if(response.status == 204){
            let currentRow = parseInt(document.getElementById(document.activeElement.id).id.charAt(0));
            for (let i = 0; i < 5; i++) {
                if (i != 4) {
                    document.getElementById(currentRow + ',' + i).className = "notWord";
                } else {
                    document.getElementById(currentRow + ',' + i).className = "notWordLast";
                }
            }
            document.getElementById("conditionallyRender").style.marginBottom = "4px";
            document.getElementById("p").style.display="inline";
            setTimeout(()=>{
                document.getElementById("conditionallyRender").style.marginBottom = "0px";
                document.getElementById("p").style.display = "none";}, 1000);
           
        }
        if(response.status ==200){
        const clearGuess = {type: 'CLEAR_GUESS'};
        yield put (clearGuess);
        const getGuesses = { type: 'GET_GUESSES'};
        yield put(getGuesses);
        }
        
    } catch (error) {
        console.log('Error in axios POST (postGuess): ', error);
    }
}

function* getGuesses(action) {
    try {
        console.log("action ",action)
        const response = yield axios.get('/guess');
        console.log("response.data ",response.data)
        const guesses = { type: 'SET_GUESSES', payload: response.data };
        yield put(guesses);
      
    } catch (error) {
        console.log('Error in axios get', error);
    }
}

function* resetGuesses(action) {
    try {
        yield axios.put('/guess/reset');
        const getGuesses = { type: 'GET_GUESSES' };
        yield put(getGuesses);
       
    } catch (error) {
        console.log('Error in axios put', error);
    }
}

function* getGuessSaga() {
    yield takeLatest('POST_GUESS', postGuess);
    yield takeLatest('GET_GUESSES', getGuesses);
    yield takeLatest('RESET_GUESSES', resetGuesses);
}

export default getGuessSaga;