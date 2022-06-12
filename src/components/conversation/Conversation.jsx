import React, { useEffect, useState } from 'react'
import { userRequest } from '../../requestMethod'
import './conversation.css'

const Conversation = ({ conversation, currentUser }) => {
    const [user, setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const friendId = conversation.members.find((member) => member !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await userRequest.get(`/user?userId=${friendId}`)
                const { data } = res.data
                setUser(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUser()
    }, [conversation, currentUser])

    return (
        <div className='conversation'>
            <img className='conversationImg'
                src={user?.profilePicture?  user?.profilePicture : PF + 'person/noProfilePicture.jpg'}
                alt=''
            />
            <span className='conversationName'>{user?.username}</span>
        </div>
    )
}

export default Conversation