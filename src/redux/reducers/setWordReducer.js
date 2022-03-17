const setWordToGuess = (state = "", action) => {
    switch (action.type) {
        case 'SET_WORD':
            let wordToGuess = action.payload;
            state = wordToGuess
            return state;
        default:
            return state;   
    }
};

export default setWordToGuess;