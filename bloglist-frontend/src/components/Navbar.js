import React from "react";
import {clearUser} from "../reducers/authReducer";
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {routes} from "../App";

const Navbar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const style = {
        display: 'flex',
        background: '#cccccc',
        margin: "5px",
        padding: "5px",
        alignItems: "center",
    }

    const logOut = () => {
        window.localStorage.removeItem("bloglistUser")
        dispatch(clearUser())
        dispatch(setNotification("Logged out"))
    }

    return <nav style={style}>
        <Link to={routes.blogList}>Blogs</Link>
        <Link to={routes.userList}>Users</Link>
        <p>{user.name} logged in</p>
        <button type="button" onClick={logOut}>Log out</button>
    </nav>
}

export default Navbar