import './closeFriends.css'

const CloseFriends = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div>
            <li className='sidebarFriend'>
                <img className='sidebarFriendImg' 
                src={user.profilePicture ? user.profilePicture : PF + 'person/noProfilePicture.jpg'} 
                alt='' />
                <span className='sidebarFriendName'>{user.username}</span>
            </li>
        </div>
    )
}

export default CloseFriends