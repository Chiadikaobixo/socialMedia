import React from 'react'
import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios'
import './feed.css'

const Feed = ({ username }) => {
    const [posts, setposts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
            const res = username
                ? await axios.get(`http://localhost:8080/profile/${username}`)
                : await axios.get(`http://localhost:8080/posts/timeline/6278349884617036999f3ed8`)
            const mypost = Object.values(res.data)[1]
            setposts(mypost)
        }
        fetchPost()
    }, [username])


    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Share />
                {posts.map((post) => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Feed
