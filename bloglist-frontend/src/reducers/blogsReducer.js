import blogService from "../services/blogs";

const initialState = []

export const blogActions = {
    INIT: 'INIT',
    ADD: 'ADD',
    REMOVE: 'REMOVE',
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort((b1, b2) => b2.likes - b1.likes)
        dispatch({
            type: blogActions.INIT,
            data: blogs
        })
    }
}

export const addBlog = (blog) => {
    return {
        type: blogActions.ADD,
        data: blog
    }
}

export const removeBlog = (blog) => {
    return {
        type: blogActions.REMOVE,
        data: blog
    }
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case blogActions.INIT:
            return action.data
        case blogActions.ADD:
            return [...state, action.data]
        case blogActions.REMOVE:
            return state.filter(b => b.id !== action.data.id)
        default:
            return state
    }

}

export default blogReducer