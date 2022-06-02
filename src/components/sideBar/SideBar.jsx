import './sideBar.css'
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import CloseFriends from '../closeFriends/CloseFriends';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { unAuthRequest } from '../../requestMethod';

const SideBar = () => {
    const [friends, setFriends] = useState([])
    const [followers, setFollowers] = useState([])
    const { user: { data: { login: { _id } } } } = useContext(AuthContext)

    useEffect(() => {
        const getfriends = async () => {
            try {
                const res = await unAuthRequest.get(`/friends/${_id}`)
                const { data } = res.data
                setFriends(data)
            } catch (error) {

            }
        }
        getfriends()
    }, [_id])

    useEffect(() => {
        const getfollowers = async () => {
            try {
                const res = await unAuthRequest.get(`/followers/${_id}`)
                const { data } = res.data
                setFollowers(data)
            } catch (error) {

            }
        }
        getfollowers()
    }, [_id])


    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                            <RssFeed className="sidebarIcon" />
                            <span className="sidebarListItemText">Feed</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <Link to='/messenger' style={{ textDecoration: 'none', color: 'black' }}>
                            <Chat className="sidebarIcon" />
                            <span className="sidebarListItemText">Chats</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Link to='/explore' style={{ textDecoration: 'none', color: 'black' }}>
                            <Group className="sidebarIcon" />
                            <span className="sidebarListItemText">Explore Users</span>
                        </Link>
                    </li>

                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <div>
                    <div>
                        <div>
                            <h3 className='following'>Following</h3>
                        </div>
                        <ul className="sidebarFriendList">
                            {friends.map((friend) => (
                                <Link to={"/profile/" + friend.username} key={friend._id} style={{ textDecoration: 'none' }}>
                                    <CloseFriends key={friend.id} user={friend} />
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div>
                            <h3 className='following'>Followers</h3>
                        </div>
                        <ul className="sidebarFriendList">
                            {followers.map((follower) => (
                                <Link to={"/profile/" + follower.username} key={follower._id} style={{ textDecoration: 'none' }}>
                                    <CloseFriends key={follower.id} user={follower} />
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar