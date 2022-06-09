import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import SideBar from "../../components/sideBar/SideBar"
import TopBar from "../../components/topBar/TopBar"
import Feed from "../../components/feed/Feed"
import RightBar from "../../components/rightBar/RightBar"
import { useParams } from 'react-router'
import { unAuthRequest } from '../../requestMethod'
import './profile.css'
import { AuthContext } from '../../context/authContext'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import app from '../../firebase'
import { Modal } from 'react-bootstrap'
import { Form, Button } from 'react-bootstrap'
import Logout from '../../components/logout/Logout'

const Profile = () => {
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const username = useParams().username
    const [file, setFile] = useState(null)
    const { user: { data: { login: { _id, username: loggedinUsername } } } } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [city, setCity] = useState()
    const [from, setFrom] = useState()
    const [relationship, setRelationship] = useState()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)


    useEffect(() => {
        const fetchUser = async () => {
            const res = await unAuthRequest.get(`/user?username=${username}`)
            const { data: { data } } = res
            setUser(data)
            setCity(data.city)
            setFrom(data.from)
            setRelationship(data.relationship)
        }
        fetchUser()
    }, [username])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let editUser = { profilePicture: '' }
        let editUserDetails = { city, from, relationship }


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
            }, (error) => { }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const product = downloadURL
                    editUser.profilePicture = product

                    try {
                        await unAuthRequest.post(`/avatar`, data)
                        await unAuthRequest.patch(`/users/${_id}`, editUser);
                        await unAuthRequest.patch(`/users/${_id}`, editUserDetails);
                        window.location.reload()
                    } catch (error) {
                        console.log(error)
                    }
                })
            })
        } else {
            await unAuthRequest.patch(`/users/${_id}`, editUserDetails);
            window.location.reload()
        }
    }

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
                                src={user.coverPicture ? user.coverPicture : PF + 'person/noCover.JPG'}
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={user.profilePicture ? user.profilePicture : PF + 'person/noProfilePicture.jpg'}
                                alt=""
                            />
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                id='file'
                                accept='.png, .jpeg, .jpg'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            {username === loggedinUsername &&
                                <button onClick={handleShow} className='shareButton' data-toggle='modal'>Edit profile</button>}
                        </div>
                        <div>
                            {username === loggedinUsername &&
                                <Logout />}
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <RightBar user={user} />
                    </div>
                </div>
            </div>


            <Modal show={show} onHide={handleClose} >
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit} >
                            <Form.Group>
                                <img
                                    className="profileCoverImg"
                                    src={user.coverPicture ? user.coverPicture : `${PF}person/noCover.jpg`}
                                    alt=""
                                />
                            </Form.Group>
                            <label htmlFor='file'>
                                <Form.Group>
                                    <img className='shareProfileImg'
                                        src={user.profilePicture ?
                                            user.profilePicture :
                                            PF + 'person/noProfilePicture.jpg'}
                                        alt='' />
                                    <input
                                        style={{ display: 'none' }}
                                        type='file'
                                        id='file'
                                        accept='.png, .jpeg, .jpg'
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='text'
                                        placeholder='City'
                                        name='city'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='text'
                                        placeholder='Location'
                                        name='from'
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control
                                        type='text'
                                        placeholder='Relationship'
                                        name='relationship'
                                        value={relationship}
                                        onChange={(e) => setRelationship(e.target.value)}
                                    />
                                </Form.Group>
                            </label>
                            <Form.Group>
                                <button className='shareButton' type='onSubmit' >Update</button>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}

export default Profile