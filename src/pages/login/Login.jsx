import './login.css'

const Login = () => {
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
                    <div className='loginBox'>
                        <input placeholder='Email' className='loginInput' />
                        <input placeholder='Password' className='loginInput' />
                        <button className='loginButton'>LogIn</button>
                        <span className='loginForgot'>Forget Password?</span>
                        <button className='loginRegisterButton'>Create a New Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login