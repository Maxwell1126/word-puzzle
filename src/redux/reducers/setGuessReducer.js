const defaultState = {a:'', b:'', c:'', d:'', e:'', f:''};
let newState = { a: '', b: '', c: '', d: '', e: '', f: ''};
const setGuesses = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_GUESSES':
            if (action.payload[0].length === 0) {
                for (let i = 0; i < 6; i++) {
                    if (i === 0 && state.a.length > 0) {
                        newState.a = action.payload[i];
                    } else if (i === 1 && state.b.length > 0) {
                        newState.b = action.payload[i];
                    } else if (i === 2 && state.c.length > 0) {
                        newState.c = action.payload[i];
                    } else if (i === 3 && state.d.length > 0) {
                        newState.d = action.payload[i];
                    } else if (i === 4 && state.e.length > 0) {
                        newState.e = action.payload[i];
                    } else if (i === 5 && state.f.length > 0) {
                        newState.f = action.payload[i];
                    }
                }
                Object.assign(state, newState);
                console.log("state else ", state)
                return { ...state};

            } else {
                for(let i =0; i< action.payload.length; i++){
                    if(i === 0 && action.payload.length){
                        newState.a = action.payload[i];
                    } else if (i === 1 && action.payload.length) {
                        newState.b = action.payload[i];
                    } else if (i === 2 && action.payload.length) {
                        newState.c = action.payload[i];
                    } else if (i === 3 && action.payload.length) {
                        newState.d = action.payload[i];
                    } else if (i === 4 && action.payload.length) {
                        newState.e = action.payload[i];
                    } else if (i === 5 && action.payload.length) {
                        newState.f = action.payload[i];
                    }
                }
                Object.assign(state, newState);
                console.log("state else ", state)
                return { ...state };
            }
            
        case 'ADD_GUESS':
            console.log("in add")
            return[...state,  action.payload]; 
        default:
            return state;
    }
};

export default setGuesses;