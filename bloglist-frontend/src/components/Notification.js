import React from "react"
import {useSelector} from "react-redux";

const Notification = () => {

    const notification = useSelector(state => state.notification)

    if (notification) {
        return <div style={{border: "2px solid"}} id="message">{notification}</div>
    } else {
        return null
    }
}

export default Notification