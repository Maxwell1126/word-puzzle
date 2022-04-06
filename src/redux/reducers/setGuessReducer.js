const defaultState = {a:'', b:'', c:'', d:'', e:'', f:''};
const setGuesses = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_GUESSES':

            let newState= { a: '', b: '', c: '', d: '', e: '', f: '' };

           for(let i =0; i< action.payload.length; i++){
               if(i == 0 && action.payload.length){
                   newState.a = action.payload[i];
               } else if (i == 1 && action.payload.length) {
                   newState.b = action.payload[i];
               } else if (i == 2 && action.payload.length) {
                   newState.c = action.payload[i];
               } else if (i == 3 && action.payload.length) {
                   newState.d = action.payload[i];
               } else if (i == 4 && action.payload.length) {
                   newState.e = action.payload[i];
               } else if (i == 5 && action.payload.length) {
                   newState.f = action.payload[i];
               }
               
           }
           Object.assign(state, newState);

            return {...state};
        case 'ADD_GUESS':
            console.log("in add")
            return[...state,  action.payload];
           
        default:
            return state;
    }
};

export default setGuesses;