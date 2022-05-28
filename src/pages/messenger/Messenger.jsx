import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import TopBar from '../../components/topBar/TopBar'
import { AuthContext } from '../../context/authContext'
import { unAuthRequest } from '../../requestMethod'
import './messenger.css'


const Messenger = () => {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef()
    const { user: { data: { login: user } } } = useContext(AuthContext)


    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await unAuthRequest.get(`/conversations/${user._id}`)
                const { data } = res.data
                setConversations(data)
            } catch (error) {

            }
        }
        getConversation()
    }, [user._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await unAuthRequest.get(`/messages/${currentChat._id}`)
                const { data } = res.data
                setMessages(data)
            } catch (error) {

            }
        }
        getMessages()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        try {
            const res = await unAuthRequest.post(`/messages`, message)
            const { data } = res.data
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <TopBar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput' />
                        {conversations.map((conversation) => (
                            <div onClick={(() => setCurrentChat(conversation))} key={conversation._id}>
                                <Conversation conversation={conversation} currentUser={user} key={conversation._id} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {currentChat ?
                            <div>
                                <div className='chatBoxTop'>
                                    {messages.map((message) => (
                                        <div ref={scrollRef} key={message._id}>
                                        <Message message={message} own={message.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className='chatBoxBottom'>
                                    <textarea
                                        className='chatMessageInput'
                                        placeholder='Write something...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    >
                                    </textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}>
                                        send
                                    </button>
                                </div>
                            </div> :
                            <span className='noConversationText'>Open a conversation to start a chat!!</span>
                        }
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger