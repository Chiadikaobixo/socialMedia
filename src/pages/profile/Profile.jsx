import React from 'react'
import SideBar from "../../components/sideBar/SideBar"
import TopBar from "../../components/topBar/TopBar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightBar/RightBar"
import './profile.css'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
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
                                src={`${PF}person/IMG-4.JPG`}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={`${PF}person/IMG-0.JPG`}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">Chiadikaobi</h4>
                            <span className="profileInfoDesc">Software Developer</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username="punk" />
                        <RightBar profile />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile