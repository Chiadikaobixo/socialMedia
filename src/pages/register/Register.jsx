import './register.css'

const Register = () => {
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
                        <input placeholder='Name' className='loginInput' />
                        <input placeholder='Email' className='loginInput' />
                        <input placeholder='Password' className='loginInput' />
                        <input placeholder='Confirm Password' className='loginInput' />
                        <button className='loginButton'>Sign-Up</button>
                        <button className='loginRegisterButton'>Already has an account? Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register