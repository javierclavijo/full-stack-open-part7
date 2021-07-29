import React from "react"
import PropTypes from "prop-types"
import {Link} from "react-router-dom";

export const blogStyle = {border: "2px solid", margin: "5px", padding: "5px"}
const Blog = ({blog}) => {

    return (<div style={blogStyle} className="blog">
        <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
        </Link>
    </div>)
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}

export default Blog