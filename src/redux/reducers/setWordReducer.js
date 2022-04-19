const setWordToGuess = (state = {word:""}, action) => {
    switch (action.type) {
        case 'SET_WORD':
            let newState = {word:action.payload}
            Object.assign(state, newState);
            return { ...state };
            // let wordToGuess = action.payload;
            // state = wordToGuess
            // return state;
        default:
            return state;   
    }
};

export default setWordToGuess;