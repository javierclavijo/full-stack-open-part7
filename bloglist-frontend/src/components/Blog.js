import React, {useState} from "react"
import blogService from "../services/blogs"
import PropTypes from "prop-types"
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";
import {removeBlog} from "../reducers/blogsReducer";

const Blog = ({blog, user}) => {
    const [showDetail, setShowDetail] = useState(false)
    const [likes, setLikes] = useState(blog.likes)
    const blogStyle = {border: "2px solid", margin: "5px", padding: "5px"}
    const dispatch = useDispatch()

    const handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${blog.title}?`)) {
            try {
                await blogService.deleteBlog(blog)
                dispatch(setNotification(`${blog.title} successfully deleted`))
                dispatch(removeBlog(blog))
            } catch (error) {
                dispatch(setNotification(`Could not delete ${blog.title}`))
            }
        }
    }

    const handleLike = async (event) => {
        event.preventDefault()
        try {
            const updatedBlog = await blogService.addLike({...blog, likes})
            dispatch(setNotification(`You liked blog ${blog.title}`))
            setLikes(updatedBlog.likes)
        } catch (error) {
            dispatch(setNotification(`Couldn't like blog ${blog.title}`))
        }
    }

    if (showDetail) {
        return <div style={blogStyle} className="blog">
            <h3>{blog.title}
                <button type="button"
                        onClick={() => setShowDetail(false)}>
                    Hide
                </button>
            </h3>

            <p>URL: {blog.url}</p>
            <p>Likes: <span className="numberOfLikes">{likes}</span>
                <button type="button"
                        onClick={handleLike}
                        className="likeBlog">
                    Like
                </button>
            </p>
            <p>Author: {blog.author}</p>
            {blog.user && blog.user.name === user.name ?
                <button type="button"
                        onClick={handleDelete}
                        className="deleteBlog"
                >
                    Delete</button> :
                null
            }
        </div>
    } else {
        return (<div style={blogStyle} className="blog">
            {blog.title} {blog.author}
            <button type="button"
                    onClick={() => setShowDetail(true)} className="viewBlog">
                View
            </button>
        </div>)
    }
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default Blog