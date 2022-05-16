import React, { useContext } from 'react'
import { useRef } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/authContext'
import { CircularProgress } from '@mui/material'
import './login.css'

const Login = () => {
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({ email: email.current.value, password: password.current.value }, dispatch)
        
    }

    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>SocialMedia</h3>
                    <span className='loginDesc'>
                        We keep you Connected with your Loved ones
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleClick}>
                        <input
                            placeholder='Email'
                            type='email'
                            className='loginInput'
                            ref={email}
                            required
                        />
                        <input
                            placeholder='Password'
                            className='loginInput'
                            type='password'
                            minLength='6'
                            ref={password}
                            required
                        />
                        <button className='loginButton' type='submit' disabled={isFetching}>
                            {isFetching ? <CircularProgress size="20px" /> : "LogIn"}
                        </button>
                        <span className='loginForgot'>Forgot Password?</span>
                        <button className='loginRegisterButton'>Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login