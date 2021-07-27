import React, {useState} from "react"
import blogService from "../services/blogs"
import {setNotification} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";

const BlogForm = ({blogs, setBlogs}) => {
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
            setBlogs([...blogs, newBlog])
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
            <button
                type="button"
                onClick={() => setIsVisible(true)}
                name="ShowBlogForm">
                Create a new blog
            </button>
        )
    } else {
        return (
            <div>
                <div>
                    <form onSubmit={handleNewBlog}>
                        <div>
                            <h2>Create a new entry</h2>
                            <div>
                                Title
                                <input type="text"
                                       value={newBlogTitle}
                                       name="NewBlogTitle"
                                       onChange={({target}) => setNewBlogTitle(target.value)}/>
                            </div>
                            <div>
                                Author
                                <input type="text"
                                       value={newBlogAuthor}
                                       name="NewBlogAuthor"
                                       onChange={({target}) => setNewBlogAuthor(target.value)}/>
                            </div>
                            <div>
                                URL
                                <input type="text"
                                       value={newBlogURL}
                                       name="NewBlogURL"
                                       onChange={({target}) => setNewBlogURL(target.value)}/>
                            </div>
                            <button type="submit" id="createBlog">Create</button>
                        </div>
                    </form>
                </div>
                <button
                    type="button"
                    onClick={handleHide}>Cancel
                </button>
            </div>
        )
    }
}

export default BlogForm