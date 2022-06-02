import React, { useEffect, useState } from 'react'
import { unAuthRequest } from '../../requestMethod'
import './chatOnline.css'

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const getFriends = async () => {
            const res = await unAuthRequest.get(`/friends/${currentId}`)
            const { data } = res.data
            setFriends(data)
        }

        getFriends()
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((friend) => onlineUsers.includes(friend._id)))
    }, [friends, onlineUsers])

    const handleClick = async(user) => {
        try {
            const res = await unAuthRequest.get(`/find/${currentId}/${user._id}`)
            const {data} = res.data
            setCurrentChat(data)
        } catch (error) {
            
        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map((onlineFriend) => (
                <div className='chatOnlineFriend' onClick={()=>handleClick(onlineFriend)} >
                    <div className='chatOnlineImgContainer'>
                        <img
                            className='chatOnlineImg'
                            src={onlineFriend.profilePicture ? onlineFriend.profilePicture : PF + 'person/noProfilePicture.jpg'}
                            alt=''
                        />
                        <div className='chatOnlineBadge'></div>
                    </div>
                    <span className='chatOnlineName'>{onlineFriend.username}</span>
                </div>
            ))}
        </div>
    )
}

export default ChatOnline