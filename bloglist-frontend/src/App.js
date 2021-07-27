import React, {useState, useEffect} from "react"
import blogService from "./services/blogs"
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import {useDispatch} from "react-redux";
import {setNotification} from "./reducers/notificationReducer";
import Notification from "./components/Notification";
import {initializeBlogs} from "./reducers/blogsReducer";
import BlogList from "./components/BlogList";

const App = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const bloglistUser = window.localStorage.getItem("bloglistUser")
        if (bloglistUser) {
            const user = JSON.parse(bloglistUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem(
                "bloglistUser", JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setNotification(`Successfully logged in as ${user.name}`))
            setUser(user)
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
        setUser(null)
        dispatch(setNotification("Logged out"))
    }

    if (user === null) {
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
                <BlogForm/>
                <BlogList user={user}/>
            </div>
        )
    }
}

export default App