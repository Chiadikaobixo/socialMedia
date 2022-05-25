import React from 'react'
import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar/SideBar"
import TopBar from "../../components/topBar/TopBar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightBar/RightBar"
import { useParams } from 'react-router'
import axios from 'axios'
import './profile.css'

const Profile = () => {
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8080/?username=${username}`)
            const {data: {data}} = res
            setUser(data)
        }
        fetchUser()
    }, [username])

    return (
        <div>
            <TopBar />
            <div className="profile">
                <SideBar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.coverPicture? PF + user.coverPicture : `${PF}person/noCover.jpg`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture?  user.profilePicture : PF + 'person/noProfilePicture.jpg'}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <RightBar user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile