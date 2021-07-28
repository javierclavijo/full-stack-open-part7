const initialState = ''
let timeoutID

const notificationActions = {
    SET: 'SET_NOTIFICATION',
    CLEAR: 'CLEAR_NOTIFICATION'
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationActions.SET:
            console.log(action.data)
            return action.data
        case notificationActions.CLEAR:
            return initialState
        default:
            return state
    }
}

export const setNotification = (notification, seconds = 5) => {
    return async dispatch => {
        dispatch({
            type: notificationActions.SET,
            data: notification
        })
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch(clearNotification())
        }, seconds * 1000)
    }
}

export const clearNotification = () => {
    return {type: notificationActions.CLEAR}
}

export default notificationReducer