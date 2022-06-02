import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { AuthContext } from '../../context/authContext'
import './topBar.css'


const TopBar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: { data: { login } } } = useContext(AuthContext)
    const user = login

    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='logo'>
                        SocialMedia
                    </span>
                </Link>
            </div>
            <div className='topbarCenter'>
                <div className='searchbar'>
                    <Search />
                    <input placeholder='Search' className='searchInput' />
                </div>
            </div>
            <div className='topbarRight'>
                <div className='topbarLinks'>
                    <span className='topbarLink'>Homepage</span>
                    <span className='topbarLink'>TimeLine</span>
                </div>
                <div className='topbarIcons'>
                    <div className='topbarIconItem'>
                        <Person />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Link to='/messenger' style={{ textDecoration: 'none', color: 'white' }}>
                            <Chat />
                        </Link>
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img
                        src={user.profilePicture ?
                            user.profilePicture :
                            PF + 'person/noProfilePicture.jpg'}
                        alt='profilePicture'
                        className='topbarImg'
                    />
                </Link>
            </div>
        </div>
    )
}

export default TopBar