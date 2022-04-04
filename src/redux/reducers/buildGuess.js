const buildGuess = (state = {guess:"", lastKey: ""}, action) => {
    switch (action.type) {
        case 'BUILD_GUESS':
            let guess = action.payload;
            state.guess = state.guess + guess;
            state.lastKey = guess;
            return {...state};
        case 'DELETE_LETTER':
            state.guess = state.guess.slice(0, -1);
            state.lastKey = "Backspace"
            return { ...state };
        case 'CLEAR_GUESS':
            state.guess = "";
            state.lastKey = "Enter"
            return { ...state };
        default:
            return state;
    }
};

export default buildGuess;