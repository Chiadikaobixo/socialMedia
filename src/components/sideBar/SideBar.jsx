import './sideBar.css'
import {
    RssFeed,
    Chat,
    Group,
} from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom'
import CloseFriends from '../closeFriends/CloseFriends';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { unAuthRequest } from '../../requestMethod';
import { motion } from "framer-motion";
import { AiOutlineClose } from 'react-icons/ai';
import { BsFilterLeft } from 'react-icons/bs';

const Loadvariants = {
    hidden: {
        x: "-100vw",
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            duration: 1.5
        },
    }
}

const SideBar = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [friends, setFriends] = useState([])
    const [followers, setFollowers] = useState([])
    const { user: { data: { login: { _id } } } } = useContext(AuthContext)
    const username = useParams().username
    
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
        <div>
            <div className='xoxo'>
            {showProfile? (''):( !username &&
                <button
                    className="xoxoxo"
                    onClick={() => setShowProfile(true)}
                >
                    <BsFilterLeft />
                </button>)}
            </div>
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

            <div className="sidebarr">
                {showProfile && 
                    <motion.div
                    initial="hidden"
                    animate="visible"
                    exit={{ x: "-100vw", transition: { ease: 'easeInOut' } }}
                    variants={Loadvariants}>
                    <div className="sidebarWrapperr">
                        <AiOutlineClose
                            className="sidebar__close"
                            onClick={() => setShowProfile(false)}
                        />
                        <ul className="sidebarListt">
                            <li className="sidebarListItemm">
                                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                                    <RssFeed className="sidebarIconn" />
                                    <span className="sidebarListItemTextt">Feed</span>
                                </Link>
                            </li>
                            <li className="sidebarListItemm">
                                <Link to='/messenger' style={{ textDecoration: 'none', color: 'black' }}>
                                    <Chat className="sidebarIconn" />
                                    <span className="sidebarListItemTextt">Chats</span>
                                </Link>
                            </li>
                            <li className="sidebarListItemm">
                                <Link to='/explore' style={{ textDecoration: 'none', color: 'black' }}>
                                    <Group className="sidebarIconn" />
                                    <span className="sidebarListItemTextt">Explore Users</span>
                                </Link>
                            </li>

                        </ul>
                        <button className="sidebarButtonn">Show More</button>
                        <hr className="sidebarHrr" />
                        <div>
                            <div>
                                <div>
                                    <h3 className='followingg'>Following</h3>
                                </div>
                                <ul className="sidebarFriendListt">
                                    {friends.map((friend) => (
                                        <Link to={"/profile/" + friend.username} key={friend._id} style={{ textDecoration: 'none' }}>
                                            <CloseFriends key={friend.id} user={friend} />
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div>
                                    <h3 className='followingg'>Followers</h3>
                                </div>
                                <ul className="sidebarFriendListt">
                                    {followers.map((follower) => (
                                        <Link to={"/profile/" + follower.username} key={follower._id} style={{ textDecoration: 'none' }}>
                                            <CloseFriends key={follower.id} user={follower} />
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.div>}
            </div>
        </div >
    );
}

export default SideBar