import React, {useState, useEffect} from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "./reducers/notificationReducer";
import Notification from "./components/Notification";
import {initializeBlogs} from "./reducers/blogsReducer";
import BlogList from "./components/BlogList";
import {clearUser, setUser} from "./reducers/authReducer";
import {Redirect, Route, Switch} from "react-router";
import UserList from "./components/UserList";

const routes = {
    blogList: '/blogs',
    userList: '/users',
}

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        const bloglistUser = window.localStorage.getItem("bloglistUser")
        if (bloglistUser) {
            const userData = JSON.parse(bloglistUser)
            dispatch(setUser(userData))
            blogService.setToken(userData.token)
        }
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userData = await loginService.login({username, password})
            window.localStorage.setItem(
                "bloglistUser", JSON.stringify(userData)
            )
            dispatch(setUser(userData))
            blogService.setToken(userData.token)
            dispatch(setNotification(`Successfully logged in as ${userData.name}`))
            setUsername("")
            setPassword("")
        } catch (error) {
            dispatch(setNotification("Wrong credentials!"))
        }
    }

    const loginForm = () => (
        <div>
            <h2>Log in</h2>
            <Notification/>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input type="text"
                           value={username}
                           name="Username"
                           onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    Password
                    <input type="password"
                           value={password}
                           name="Password"
                           onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit" id="loginButton">Login</button>
            </form>
        </div>
    )

    const logOut = () => {
        window.localStorage.removeItem("bloglistUser")
        dispatch(clearUser())
        dispatch(setNotification("Logged out"))
    }

    if (!user.token) {
        return loginForm()
    } else {
        return (
            <div>
                <Notification/>
                <h2>blogs</h2>
                <div>
                    <p>{user.name} logged in</p>
                    <button type="button" onClick={logOut}>Log out</button>
                </div>
                <Switch>
                    <Route path={routes.blogList}>
                        <BlogForm/>
                        <BlogList/>
                    </Route>
                    <Route path={routes.userList}>
                        <UserList/>
                    </Route>
                    <Route path='/'>
                        <Redirect to={routes.blogList}/>
                    </Route>
                </Switch>
            </div>
        )
    }
}

export default App