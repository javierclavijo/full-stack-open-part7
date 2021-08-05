import React, {useState} from "react"
import blogService from "../services/blogs"
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";
import {addBlog} from "../reducers/blogsReducer";
import {Button, Card, Form, Row} from "react-bootstrap";

const BlogForm = () => {
    const [newBlogTitle, setNewBlogTitle] = useState("")
    const [newBlogAuthor, setNewBlogAuthor] = useState("")
    const [newBlogURL, setNewBlogURL] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = await blogService.create(
                {title: newBlogTitle, author: newBlogAuthor, url: newBlogURL})
            handleHide()
            dispatch(setNotification(`New blog: '${newBlog.title}', by ${newBlog.author}, at ${newBlog.url}`))
            dispatch(addBlog(newBlog))
        } catch (error) {
            dispatch(setNotification("Error submitting new blog!"))
        }
    }

    const handleHide = () => {
        setNewBlogTitle("")
        setNewBlogAuthor("")
        setNewBlogURL("")
        setIsVisible(false)
    }

    if (!isVisible) {
        return (
            <Button variant="outline-primary" className="mt-3"
                    type="button"
                    onClick={() => setIsVisible(true)}
                    name="ShowBlogForm">
                Create a new blog
            </Button>
        )
    } else {
        return (
            <Card className="p-3 m-2">
                <Form onSubmit={handleNewBlog}>
                    <h2>Create a new entry</h2>
                    <Form.Group>
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control type="text"
                                      value={newBlogTitle}
                                      name="NewBlogTitle"
                                      onChange={({target}) => setNewBlogTitle(target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Author
                        </Form.Label>
                        <Form.Control type="text"
                                      value={newBlogAuthor}
                                      name="NewBlogAuthor"
                                      onChange={({target}) => setNewBlogAuthor(target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            URL
                        </Form.Label>
                        <Form.Control type="text"
                                      value={newBlogURL}
                                      name="NewBlogURL"
                                      onChange={({target}) => setNewBlogURL(target.value)}/>
                    </Form.Group>
                    <Row className="justify-content-center">
                        <Button variant="secondary"
                                type="submit"
                                id="createBlog"
                                className="m-2 col-2">
                            Create
                        </Button>
                        <Button variant="secondary"
                                type="button"
                                onClick={handleHide}
                                className="m-2 col-2">
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default BlogForm