import thunk from "redux-thunk";
import {applyMiddleware, combineReducers, createStore} from "redux";
import blogReducer from "./reducers/blogsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";
import usersReducer from "./reducers/usersReducer";

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    user: authReducer,
    users: usersReducer,
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store