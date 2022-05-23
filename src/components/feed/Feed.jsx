import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios'
import './feed.css'
import { AuthContext } from '../../context/authContext'

const Feed = ({ username }) => {
    const [posts, setposts] = useState([])
    const {user: {data: {login: {_id}}}} = useContext(AuthContext)

    useEffect(() => {
        const fetchPost = async () => {
            const res = username
                ? await axios.get(`http://localhost:8080/profile/${username}`)
                : await axios.get(`http://localhost:8080/posts/timeline/${_id}`)
            const {data: {data}} = res
            setposts(data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPost()
    }, [username, _id])


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
