import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../reducers/usersReducer";

const UserList = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => Object.values(state.users))

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return <div>
        <h2>Users</h2>
        <table>
            <th>
                <td>Name</td>
                <td>Blogs created</td>
            </th>
            {users.map(user =>
                <tr id={user.id}>
                    <td>{user.name}</td>
                    <td>{user.blogs.length}</td>
                </tr>
            )}
        </table>
    </div>
}

export default UserList