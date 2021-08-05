import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import blogService from "../services/blogs";
import {setNotification} from "../reducers/notificationReducer";
import {initializeBlogs, removeBlog} from "../reducers/blogsReducer";
import {useHistory, useRouteMatch} from "react-router";
import {blogStyle} from "./Blog";
import {routes} from "../App";
import {Button, Card, Form, Table} from "react-bootstrap";

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
    const [comment, setComment] = useState("")

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

    const handleComment = (event) => {
        event.preventDefault()
        blogService.addComment(blog.id, comment)
        blog.comments.push(comment)
        setComment("")
    }

    if (!blog) {
        return <div>Blog not found.</div>
    }

    return <Card body className="blog">
        <Card.Title>{blog.title}</Card.Title>

        <Table>
            <tbody>
            <tr>
                <th>URL</th>
                <td>{blog.url}</td>
            </tr>
            <tr>
                <th>likes</th>
                <td>
                    <span className="numberOfLikes">{likes}</span>
                    <Button type="button"
                            onClick={handleLike}
                            className="likeBlog mx-3">
                        Like
                    </Button>
                </td>
            </tr>
            <tr>
                <th>Author</th>
                <td>{blog.author}</td>
            </tr>
            </tbody>
        </Table>
        {blog.user && blog.user.name === user.name
            ? <Button type="button"
                      onClick={handleDelete}
                      className="deleteBlog"
                      variant="outline-danger"
            >Delete</Button>
            : null
        }
        <h3>Comments</h3>
        {blog.comments.length
            ? <ul>
                {blog.comments.map(comment =>
                    <li>{comment}</li>
                )}
            </ul>
            : <div>No comments yet</div>
        }
        <Form onSubmit={handleComment}>
            <Form.Group>
                <Form.Control type="text"
                              value={comment}
                              name="Comment"
                              onChange={({target}) => setComment(target.value)}
                />
            </Form.Group>
            <Button type="submit">Add comment</Button>
        </Form>
    </Card>
}

export default BlogDetail