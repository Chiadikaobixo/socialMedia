import Online from '../online/Online'
import { Users } from '../../data'
import './rightBar.css'

const RightBar = ({ profile }) => {
    const HomeRightBar = () => {
        return (
            <div>
                <div className='birthdayContainer'>
                    <img className='birthdayImg' src='assets/gift.png' alt='' />
                    <span className='birthdayText'>
                        <b>Chiadikaobi</b> and <b>3 other friends</b>  have a birthdau today
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
                <h4 className='rightbarTitle'>User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">Enugu</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">Nigeria</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">Single</span>
                    </div>
                </div>
                <h4 className='rightbarTitle'>User friends</h4>
                <div className='rightbarFollowings'>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='assets/person/IMG-1.jpg' alt='' />
                        <span className='rightbarFollowingName'>prime</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='assets/person/IMG-2.jpg' alt='' />
                        <span className='rightbarFollowingName'>spunky</span>
                    </div>
                    <div className='rightbarFollowing'>
                        <img className='rightbarFollowingImg' src='assets/person/IMG-3.jpg' alt='' />
                        <span className='rightbarFollowingName'>franchise</span>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='rightbar'>
            <div className='rigtbarWrapper'>
                {profile? <ProfileRightBar /> : <HomeRightBar/>}
            </div>
        </div>
    )
}

export default RightBar