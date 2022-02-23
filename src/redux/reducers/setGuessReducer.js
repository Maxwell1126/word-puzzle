const setGuess = (state = "", action) => {
    switch (action.type) {
        case 'SET_GUESS':
            let currentGuess = action.payload;
            state = currentGuess
            return state;
        default:
            return state;
    }
};

export default setGuess;