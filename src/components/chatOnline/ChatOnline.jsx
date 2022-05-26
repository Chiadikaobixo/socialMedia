import React from 'react'
import './chatOnline.css'

const ChatOnline = () => {
    return (
        <div className='chatOnline'>
            <div className='chatOnlineFriend'>
                <div className='chatOnlineImgContainer'>
                    <img
                        className='chatOnlineImg'
                        src='https://www.linkpicture.com/q/IMG-1352.jpg'
                        alt=''
                    />
                    <div className='chatOnlineBadge'></div>
                </div>
                <span className='chatOnlineName'>Fidelis</span>
            </div>
        </div>
    )
}

export default ChatOnline