import Online from '../online/Online'
import { Users } from '../../data'
import './rightBar.css'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Link } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'
import { unAuthRequest, userRequest } from '../../requestMethod'

const RightBar = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const { user: { data: { login: { _id, followings, username: loggedinUsername } } } } = useContext(AuthContext)
    const [followed, setFollowed] = useState(false)
    const { dispatch } = useContext(AuthContext)

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await unAuthRequest.get(`/friends/${_id}`)
                const { data } = friendList.data
                setFriends(data)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    }, [_id])
    
    useEffect(() => {
        setFollowed(followings.includes(user?._id))
    }, [followings, user?._id])

    const handleClick = async () => {
        try {
            if (followed) {
                await unAuthRequest.put(`/users/${user._id}/unfollow`, { userId: _id })
                dispatch({ type: 'FOLLOW', payload: user._id })
            } else {
                await unAuthRequest.put(`/users/${user._id}/follow`, { userId: _id })
                dispatch({ type: 'UNFOLLOW', payload: user._id })
            }
        } catch (error) {
        }
        setFollowed(!followed)
    }


    const HomeRightBar = () => {
        return (
            <div>
                <div className='birthdayContainer'>
                    <img className='birthdayImg' src='assets/gift.png' alt='' />
                    <span className='birthdayText'>
                        <b>Chiadikaobi</b> and <b>3 other friends</b>  have their birthday today
                    </span>
                </div>
                <img className='rightbarAd' src='assets/advert.jpg' alt='' />
                <h4 className='rightbarTitle'>Online friends</h4>
                <ul className='rightbarFriendList'>
                    {Users.map((user) => (
                        <Online key={user.id} user={user} />
                    ))}
                </ul>
            </div>
        )
    }

    const ProfileRightBar = () => {
        return (
            <div>
                {user.username !== loggedinUsername && (
                    <button className='rightbarFollowButton' onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                )}
                <h4 className='rightbarTitle'>User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">
                            {
                                user.relationship === 1 ? "Single"
                                    : user.relationship === 2 ? "Married"
                                        : "-"
                            }
                        </span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User friends</h4>
                <div className='rightbarFollowings'>
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} key={friend._id} style={{ textDecoration: 'none' }}>
                            <div className='rightbarFollowing'>
                                <img
                                    className='rightbarFollowingImg'
                                    src={friend.profilePicture ? friend.profilePicture : PF + 'person/noProfilePicture.jpg'}
                                    alt=''
                                />
                                <span className='rightbarFollowingName'>{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className='rightbar'>
            <div className='rigtbarWrapper'>
                {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}

export default RightBar