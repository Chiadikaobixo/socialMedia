import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../../components/topBar/TopBar'
import { unAuthRequest } from '../../requestMethod'
import './exploreFriends.css'

const ExploreFriends = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [users, setUsers] = useState([])

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await unAuthRequest.get(`/allusers`)
            const { data } = res.data
            setUsers(data)
        }
        getAllUsers()
    }, [])

    return (
        <div>
            <TopBar />
            <div className='exploreWrapper'>
                <div className='explorefriends'>
                    {users.map((user) => (
                        <Link to={"/profile/" + user.username} key={user._id} style={{ textDecoration: 'none' }}>
                            <div className='explorefriend'>
                                <img
                                    className='explorefriendImg'
                                    src={user.profilePicture ? user.profilePicture : PF + 'person/noProfilePicture.jpg'}
                                    alt=''
                                />
                                <span className='explorefriendName'>{user.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ExploreFriends