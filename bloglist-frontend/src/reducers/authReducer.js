const initialState = {}

const userActions = {
    SET: 'SET_USER',
    CLEAR: 'CLEAR_USER'
}

export const setUser = (user) => {
    return {
        type: userActions.SET,
        data: user
    }
}

export const clearUser = () => {
    return {
        type: userActions.CLEAR
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActions.SET:
            return action.data
        case userActions.CLEAR:
            return initialState
        default:
            return state
    }
}

export default authReducer