import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { MoreVert } from '@mui/icons-material'
import moment from "moment";
import axios from 'axios'
import { Link } from 'react-router-dom'
import './post.css'
import { AuthContext } from '../../context/authContext';

const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLike] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: { data: { login: { _id } } } } = useContext(AuthContext)

    useEffect(() => {
        setIsLike(post.likes.includes(_id))
    }, [post.likes, _id])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8080/?userId=${post.userId}`)
            const { data: { data } } = res
            setUser(data)
        }
        fetchUser()
    }, [post.userId])

    const likeHandler = async () => {
        try {
            await axios.put(`http://localhost:8080/posts/${post._id}/like`, { userId: _id })
        } catch (error) {

        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLike(!isLiked)
    }
    return (
        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className='postProfileImg'
                                src={user.profilePicture ?  user.profilePicture : "https://www.linkpicture.com/q/store-2.jpg"}
                                alt=''
                            />
                        </Link>
                        <span className='postUsername'>
                            {user.username}
                        </span>
                        <span className='postDate'>{moment(post.createdAt).format('HH:mm a,  MMMM Do, YYYY')}</span>
                    </div>
                    <div className='postTopRight'>
                        <MoreVert />
                    </div>
                </div>
                <div className='postCenter'>
                    <span className='postText'>{post.desc}</span>
                    <img className='postImg' src={post.img} alt='' />
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler} alt='' />
                        <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt='' />
                        <span className='postLikeCounter'>{like} likes</span>
                    </div>
                    <div className='postBottomRight'>
                        <span className='postCommentText'>{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post