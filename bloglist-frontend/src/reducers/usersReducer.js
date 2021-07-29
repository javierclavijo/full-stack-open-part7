import usersService from "../services/users";

const initialState = {}

const usersActions = {SET: 'SET_USERS'}

export const fetchUsers = () => {
    return async dispatch => {
        const users = await usersService.getAll()
        dispatch({
            type: usersActions.SET,
            data: users
        })
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case usersActions.SET:
            return action.data
        default:
            return state
    }
}

export default usersReducer