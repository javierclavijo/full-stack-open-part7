import React from "react";
import {clearUser} from "../reducers/authReducer";
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch, useSelector} from "react-redux";
import {routes} from "../App";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const AppNavbar = () => {
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

    return <Navbar bg="dark" variant="light">
        <Container>
            <Navbar.Brand className="text-primary">Blogs App</Navbar.Brand>
            <Nav>
                <Nav.Link className="text-light"
                          href={routes.blogList}>Blogs</Nav.Link>
                <Nav.Link className="text-light"
                          href={routes.userList}>Users</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="text-light p-2">
                    {user.name} logged in
                </Navbar.Text>
                <Button variant="danger" type="button" onClick={logOut}>
                    Log out
                </Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default AppNavbar