const defaultState = { total:0, first:0, second:0, third:0, fourth:0, fifth:0, sixth:0, winPercent:0, streak:0 };
let newState = { total:0, first:0, second:0, third:0, fourth:0, fifth:0, sixth:0, winPercent:0, streak:0 };
const setStats = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_STATS':
            for (let i = 0; i < 9; i++) {
                if (i === 0 && action.payload[0].total !==0) {
                    newState.total = action.payload[0].total;
                } else if (i === 1 && action.payload[0].first !==0) {
                    newState.first = action.payload[0].first;
                } else if (i === 2 && action.payload[0].second !==0) {
                    newState.second = action.payload[0].second;
                } else if (i === 3 && action.payload[0].third !==0) {
                    newState.third = action.payload[0].third;
                } else if (i === 4 && action.payload[0].fourth !==0) {
                    newState.fourth = action.payload[0].fourth;
                } else if (i === 5 && action.payload[0].fifth !==0) {
                    newState.fifth = action.payload[0].fifth;
                } else if (i === 6 && action.payload[0].sixth !== 0) {
                    newState.sixth = action.payload[0].sixth;
                } else if (i === 7 && action.payload[0].winPercent !== 0) {
                    newState.winPercent = action.payload[0].winPercent;
                } else if (i === 8 && action.payload[0].streak !== 0) {
                    newState.streak = action.payload[0].streak;
                }
            }
            Object.assign(state, newState);
            console.log(state)
            return {...state};
        case 'SET_STATS_MULTI':
            for (let i = 0; i < 9; i++) {
                if (i === 0 && action.payload[0].total !== 0) {
                    newState.total = action.payload[0].total;
                } else if (i === 1 && action.payload[0].first !== 0) {
                    newState.first = action.payload[0].first;
                } else if (i === 2 && action.payload[0].second !== 0) {
                    newState.second = action.payload[0].second;
                } else if (i === 3 && action.payload[0].third !== 0) {
                    newState.third = action.payload[0].third;
                } else if (i === 4 && action.payload[0].fourth !== 0) {
                    newState.fourth = action.payload[0].fourth;
                } else if (i === 5 && action.payload[0].fifth !== 0) {
                    newState.fifth = action.payload[0].fifth;
                } else if (i === 6 && action.payload[0].sixth !== 0) {
                    newState.sixth = action.payload[0].sixth;
                } else if (i === 7 && action.payload[0].winPercent !== 0) {
                    newState.winPercent = action.payload[0].winPercent;
                } else if (i === 8 && action.payload[0].streak !== 0) {
                    newState.streak = action.payload[0].streak;
                }
            }
            Object.assign(state, newState);
            console.log(state)
            return { ...state };

        case 'SET_STATS_ONCE':
            for (let i = 0; i < 9; i++) {
                if (i === 0 && action.payload[0].total !== 0) {
                    newState.total = action.payload[0].total;
                } else if (i === 1 && action.payload[0].first !== 0) {
                    newState.first = action.payload[0].first;
                } else if (i === 2 && action.payload[0].second !== 0) {
                    newState.second = action.payload[0].second;
                } else if (i === 3 && action.payload[0].third !== 0) {
                    newState.third = action.payload[0].third;
                } else if (i === 4 && action.payload[0].fourth !== 0) {
                    newState.fourth = action.payload[0].fourth;
                } else if (i === 5 && action.payload[0].fifth !== 0) {
                    newState.fifth = action.payload[0].fifth;
                } else if (i === 6 && action.payload[0].sixth !== 0) {
                    newState.sixth = action.payload[0].sixth;
                } else if (i === 7 && action.payload[0].winPercent !== 0) {
                    newState.winPercent = action.payload[0].winPercent;
                } else if (i === 8 && action.payload[0].streak !== 0) {
                    newState.streak = action.payload[0].streak;
                }
            }
            Object.assign(state, newState);
            console.log(state)
            return state;
        default:
            return state;
    }
};

export default setStats;