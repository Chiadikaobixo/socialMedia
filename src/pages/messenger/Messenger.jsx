import React from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import TopBar from '../../components/topBar/TopBar'
import './messenger.css'

const Messenger = () => {
    return (
        <div>
            <TopBar />
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput' />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        <div className='chatBoxTop'>
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                        </div>
                        <div className='chatBoxBottom'>
                            <textarea className='chatMessageInput' placeholder='....'></textarea>
                            <button className='chatSubmitButton'>send</button>
                        </div>
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                    <ChatOnline/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messenger