import axios from 'axios'

export const loginCall = async (userCredentail, dispatch) => {
    dispatch({ type: "LOGIN_START" })

    try {
        const res = await axios.post("http://localhost:8080/users/login", userCredentail)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}