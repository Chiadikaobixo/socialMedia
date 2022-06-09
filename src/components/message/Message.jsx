import React, { useEffect, useState } from 'react'
import moment from 'moment'
import './message.css'
import { userRequest } from '../../requestMethod'

const Message = ({message, own}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const id = message.sender

    useEffect(() => {
        const fetchUser = async () => {
            const res = await userRequest.get(`/user?userId=${id}`)
            const {data: {data}} = res
            setUser(data)
        }
        fetchUser()
    }, [id])


    return (
        <div className={own? 'message own' : 'message'}>
            <div className='messageTop'>
                <img
                    className='messageImg'
                    src={user.profilePicture?  user.profilePicture : PF + 'person/noProfilePicture.jpg'}
                    alt=''
                />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className='messageBottom'>{moment(message.createdAt).format('HH:mm a,  MMMM Do, YYYY')}</div>
        </div>
    )
}

export default Message