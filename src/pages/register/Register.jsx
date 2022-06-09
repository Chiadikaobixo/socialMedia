import { useContext, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import { unAuthRequest } from '../../requestMethod'
import { loginCall } from '../../apiCalls'
import './register.css'

const Register = () => {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const history = useHistory()
    const { dispatch } = useContext(AuthContext)

    const handleClick = async (e) => {
        e.preventDefault()
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity('Password dont match!')
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await unAuthRequest.post("/users/signup", user)
                loginCall({ email: email.current.value, password: password.current.value }, dispatch)
                history.push('/')
            } catch (error) {

            }
        }
    }
    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>ChiadiMedia</h3>
                    <span className='loginDesc'>
                        We keep you Connected with your Loved ones
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleClick}>
                        <input
                            placeholder='Username'
                            required
                            ref={username}
                            className='loginInput'
                        />
                        <input
                            placeholder='Email'
                            required
                            ref={email}
                            className='loginInput'
                            type="email"
                        />
                        <input
                            placeholder='Password'
                            required
                            ref={password}
                            className='loginInput'
                            type="password"
                            minLength="6"
                        />
                        <input
                            placeholder='Confirm Password'
                            required
                            ref={confirmPassword}
                            className='loginInput'
                            type="password"
                        />
                        <button className='loginButton' type='submit'>Sign-Up</button>
                        <Link to='/login'>
                            <button className='loginRegisterButton'>Already has an account? Login</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register