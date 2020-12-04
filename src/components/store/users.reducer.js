const initialState = { 'viewObj': '' };

const userReducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type === 'SET_VIEWOBJ') {
        newState.viewObj = action.viewObj
    }
    return newState;
}
export default userReducer;