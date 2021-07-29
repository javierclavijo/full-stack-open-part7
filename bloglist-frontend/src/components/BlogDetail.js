import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import blogService from "../services/blogs";
import {setNotification} from "../reducers/notificationReducer";
import {initializeBlogs, removeBlog} from "../reducers/blogsReducer";
import {useHistory, useRouteMatch} from "react-router";
import {blogStyle} from "./Blog";
import {routes} from "../App";

const BlogDetail = () => {
    const dispatch = useDispatch()
    const match = useRouteMatch(routes.blogDetail)
    const history = useHistory()

    const user = useSelector(state => state.user)
    const blogs = useSelector(state => state.blogs)
    const blog = match
        ? blogs.find(b => b.id === match.params.id)
        : null

    const [likes, setLikes] = useState(0)

    useEffect(() => {
        if (!blogs.length) {
            dispatch(initializeBlogs())
        }
    }, [])

    useEffect(() => {
        if (blog) {
            setLikes(blog.likes)
        }
    }, [blog])

    const handleDelete = async (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${blog.title}?`)) {
            try {
                await blogService.deleteBlog(blog)
                dispatch(setNotification(`${blog.title} successfully deleted`))
                dispatch(removeBlog(blog))
                history.push(routes.blogList)
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

    if (!blog) {
        return <div>Blog not found.</div>
    }

    return <div style={blogStyle} className="blog">
        <h3>{blog.title}</h3>

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
}

export default BlogDetail