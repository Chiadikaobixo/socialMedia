import { useContext, useRef, useState } from 'react'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../../firebase'
import { AuthContext } from '../../context/authContext'
import { unAuthRequest } from '../../requestMethod'
import './share.css'
import { Link } from 'react-router-dom'

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

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            const storage = getStorage(app)
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
                (error) => { }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        const product = downloadURL
                        newPost.img = product

                        try {
                            await unAuthRequest.post("/avatar", data);
                            await unAuthRequest.post("/posts", newPost)
                            window.location.reload()
                        } catch (err) {

                        }
                    });
                }
            )
        } else {
            await unAuthRequest.post("/posts", newPost)
            window.location.reload()
        }
    }

    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <Link to={`/profile/${user.username}`}>
                        <img className='shareProfileImg'
                            src={user.profilePicture ?
                                user.profilePicture :
                                PF + 'person/noProfilePicture.jpg'}
                            alt='' />
                    </Link>
                    <input
                        placeholder={user.username + ', feel free to share your thought with us.'}
                        className='shareInput'
                        ref={desc}
                    />
                </div>
                <hr className='shareHr' />
                {file && (
                    <div className='shareImgContainer'>
                        <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
                        <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
                    </div>
                )}
                <form className='shareBottom' onSubmit={handleSubmit} >
                    <div className='shareOptions'>
                        <label htmlFor='file' className='shareOption'>
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className='shareOptionText'>Photo</span>
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                id='file'
                                accept='.png, .jpeg, .jpg'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className='shareOption'>
                            <Room htmlColor='green' className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share