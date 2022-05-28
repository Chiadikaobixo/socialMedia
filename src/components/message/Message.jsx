import React from 'react'
import moment from 'moment'
import './message.css'

const Message = ({message, own}) => {
    return (
        <div className={own? 'message own' : 'message'}>
            <div className='messageTop'>
                <img
                    className='messageImg'
                    src='https://www.linkpicture.com/q/IMG-1352.jpg'
                    alt=''
                />
                <p className='messageText'>{message.text}</p>
            </div>
            <div className='messageBottom'>{moment(message.createdAt).format('HH:mm a,  MMMM Do, YYYY')}</div>
        </div>
    )
}

export default Message