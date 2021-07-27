import blogs from "../services/blogs";

const initialState = []

export const blogActions = {
    init: 'INIT'
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogs.getAll()
        blogs.sort((b1, b2) => b2.likes - b1.likes)
        dispatch({
            type: blogActions.init,
            data: blogs
        })
    }
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case blogActions.init:
            return action.data
        default:
            return state
    }

}

export default blogReducer