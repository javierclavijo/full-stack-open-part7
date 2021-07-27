import Blog from "./Blog";
import React from "react";
import {useSelector} from "react-redux";

const BlogList = ({setBlogs}) => {
    const blogs = useSelector(state => state.blogs)
    return (
        <div>
            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}
                />
            )}
        </div>
    )
}