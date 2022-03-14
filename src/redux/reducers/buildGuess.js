const buildGuess = (state = "", action) => {
    switch (action.type) {
        case 'BUILD_GUESS':
            let guess = action.payload;
            state = state + guess
            return state;
        case 'DELETE_LETTER':
            state = state.slice(0, -1);
            return state;
        case 'CLEAR_GUESS':
            state = "";
            return state;
        default:
            return state;
    }
};

export default buildGuess;