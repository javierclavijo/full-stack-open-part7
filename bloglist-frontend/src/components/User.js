import React, {useEffect} from "react";
import {useRouteMatch} from "react-router";
import {routes} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../reducers/usersReducer";

const User = () => {
    const dispatch = useDispatch()
    const match = useRouteMatch(routes.userDetail)
    const users = useSelector(state => state.users)
    const user = match
        ? users.find(u => u.id === match.params.id)
        : null

    useEffect(() => {
        if (!users.length) {
            dispatch(fetchUsers())
        }
    }, [])


    if (!user) {
        return <div>User not found.</div>
    } else {
        return <div>
            <h2>{user.name}</h2>
            <h3>Blogs</h3>
            {user.blogs.length
                ? <ul>{user.blogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}</ul>
                : `${user.name} has not created any blogs yet.`
            }
        </div>
    }
}

export default User