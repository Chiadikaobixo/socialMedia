import './topBar.css'
import { Search, Person, Chat, Notifications } from '@mui/icons-material'

const TopBar = () => {
    return (
        <div className='topbarContainer'>
            <div className='topbarLeft'>
                <span className='logo'>SocialMedia</span>
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
                        <Chat />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                    <div className='topbarIconItem'>
                        <Notifications />
                        <span className='topbarIconBadge'>1</span>
                    </div>
                </div>
                <img src='assets/person/IMG-1.jpg' alt='profilePicture' className='topbarImg'  />
            </div>
        </div>
    )
}

export default TopBar