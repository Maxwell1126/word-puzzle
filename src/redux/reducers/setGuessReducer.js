const setGuesses = (state = [], action) => {
    switch (action.type) {
        case 'SET_GUESSES':
            let guessList = action.payload;
            state = guessList
            return state;
        default:
            return state;
    }
};

export default setGuesses;