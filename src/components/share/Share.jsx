import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import axios from 'axios'
import './share.css'

const Share = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: { data: { login } } } = useContext(AuthContext)
    const user = login
    const desc = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        try {
            await axios.post("http://localhost:8080/posts", newPost)
        } catch (error) {

        }
    }

    const handleChange = (e) => {
        setFile(e.target.file)
    }
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className='shareProfileImg'
                        src={user.profilePicture ?
                            PF + user.profilePicture :
                            PF + 'person/IMG-1.jpg'}
                        alt='' />
                    <input
                        placeholder={user.username + ', feel free to share your thought with us.'}
                        className='shareInput'
                        ref={desc}
                    />
                </div>
                <hr className='shareHr' />
                <div className='shareBottom'>
                    <form className='shareOptions' onSubmit={handleSubmit} >
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo/Video</span>
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                id='file'
                                accept='.png, .jpeg, .jpg'
                                onChange={handleChange}
                            />
                        </label>
                        <div className='shareOption'>
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotions htmlColor='darkblue' className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                        <button className='shareButton' type='submit'>Share</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Share