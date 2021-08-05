import React from "react"
import {useSelector} from "react-redux";
import {Alert} from "react-bootstrap";

const Notification = () => {

    const notification = useSelector(state => state.notification)

    if (notification) {
        return <Alert variant="info"
                      className="my-2"
                      id="message">{notification}</Alert>
    } else {
        return null
    }
}

export default Notification