import Blog from "./Blog";
import React from "react";
import {useSelector} from "react-redux";
import {Table} from 'react-bootstrap';

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    return (
        <Table striped bordered hover
        className="my-3">
            <tbody>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                />
            )}
            </tbody>
        </Table>
    )
}

export default BlogList